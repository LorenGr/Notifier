import React from 'react';


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: "No new messages!",
            marketing: ""

        };
        fetch('http://localhost:8080/open').then(data => console.log(data));
        this.broadcast = this.broadcast.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.ws = new WebSocket('ws:/localhost:8080');
        // Connection opened
        this.ws.addEventListener('open', function (event) {
            //ws.send('Hello Server!');
        });

        this.ws.addEventListener('message', msg => {
            this.setState({messages: msg.data});
        });
    }

    broadcast(e) {
        e.preventDefault();
        e.stopPropagation();
        this.ws.send(this.state.marketing);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (<div>
            <form onSubmit={this.broadcast}>
                <input name='marketing' onChange={this.handleChange} value={this.state.marketing} type="text"/>
                <button type="submit"> Broadcast</button>
            </form>
            <div>{this.state.messages}</div>
        </div>);
    }
};

export default App;
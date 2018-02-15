import React from 'react';
import {
    Card
} from 'antd';
import 'antd/dist/antd.css';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: "No new messages!",
            events: "No new events!"
        };
        fetch('http://localhost:8080/open').then(data => console.log(data));
        this.handleChange = this.handleChange.bind(this);
        this.onUnload = this.onUnload.bind(this);
    }

    componentDidMount() {
        console.log("WebSocket opened");
        this.ws = new WebSocket('ws:/localhost:8080');
        /* Connection opened
        this.ws.addEventListener('open', function (event) {

            //ws.send('Hello Server!');
        });
        */

        this.ws.addEventListener('message', msg => {
            this.setState(
                {
                    messages: JSON.parse(msg.data).messages,
                    events: JSON.parse(msg.data).events,
                }
            );
        });

        window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload(event) {
        this.ws.close();
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (<div>
            <Card bordered={false} title="Real-time Notifications">
                <Card type="inner" title="Messages">{this.state.messages}</Card>
                <Card type="inner" title="Events">{this.state.events}</Card>
            </Card>
        </div>);
    }
};

export default App;
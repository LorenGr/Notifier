import React from 'react';
import {
    Button,
    Card,
    Input
} from 'antd';
import 'antd/dist/antd.css';

const {TextArea} = Input;

class Admin extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            messages: "",
            events: ""
        };
        fetch('http://localhost:8080/open').then(data => console.log(data));
        this.broadcast = this.broadcast.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUnload = this.onUnload.bind(this);
    }

    componentDidMount() {
        this.ws = new WebSocket('ws:/localhost:8080');
        // Connection opened
        this.ws.addEventListener('open', function (event) {
            //ws.send('Hello Server!');
        });

        window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload(event) {
        this.ws.close();
    }


    broadcast(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.loading) return false;
        this.setState({loading: true});
        fetch('http://localhost:8080/broadcast', {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify([
                {
                    messages: this.state.messages,
                    events: this.state.events
                }
            ]),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(data => this.setState({loading: false}));
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (<Card bordered={false} title="Notifications Broadcaster">
            <form onSubmit={this.broadcast}>
                <Card bordered={false} title="Messages">
                <TextArea
                    rows={4}
                    name='messages'
                    onChange={this.handleChange}
                    value={this.state.messages} type="text"/>
                </Card>

                <Card bordered={false} title="Events">
                <TextArea
                    rows={4}
                    name='events'
                    onChange={this.handleChange}
                    value={this.state.events} type="text"/>
                </Card>

                <Button
                    htmlType="submit"
                    loading={this.state.loading}
                    type="primary"> Broadcast</Button>

            </form>
        </Card>);
    }
};

export default Admin;
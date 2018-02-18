import React from 'react';
import {
    Button,
    Card,
    Form,
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
        this.broadcast = this.broadcast.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUnload = this.onUnload.bind(this);

        this.ws = new WebSocket('ws:/localhost:8080');
        this.ws.addEventListener('open', event => {
            this.ws.send(JSON.stringify({id: 'admin'}));
        });
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload(event) {
        this.ws.close();
    }


    broadcast(type, notification) {
        const self = this;
        return function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (self.state.loading) return false;
            self.setState({loading: true});
            fetch('http://localhost:8080/broadcast', {
                method: 'post',
                mode: 'cors',
                body: JSON.stringify([
                    {
                        type,
                        data: self.state[type],
                        notification
                    }
                ]),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(data => self.setState({loading: false}));
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (<Card bordered={false} title="Notifications Broadcaster">
            <Form onSubmit={
                this.broadcast(
                    'messages',
                    'You have new messages!'
                )
            }>
                <Card bordered={false} title="Messages">
                <TextArea
                    rows={4}
                    name='messages'
                    onChange={this.handleChange}
                    value={this.state.messages} type="text"/>
                </Card>
                <Button
                    htmlType="submit"
                    loading={this.state.loading}
                    type="primary"> Send message</Button>
            </Form>
            <Form onSubmit={this.broadcast(
                'events',
                'You have new events!'
            )}>
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
                    type="primary"> Send Events</Button>
            </Form>
        </Card>);
    }
};

export default Admin;
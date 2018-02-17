import React from 'react';
import {
    Card,
    Form,
    Avatar,
    notification,
    Icon,
    Input,
    Button
} from 'antd';
import 'antd/dist/antd.css';

const InputGroup = Input.Group;
const FormItem = Form.Item;

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            logged: false,
            messages: "No new messages!",
            events: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.onUnload = this.onUnload.bind(this);
        this.login = this.login.bind(this);
        this.initNotifier = this.initNotifier.bind(this);
    }

    initNotifier() {
        this.ws = new WebSocket('ws:/localhost:8080');
        this.ws.addEventListener('open', event => {
            this.ws.send(JSON.stringify({id: this.state.username}));
        });
        this.ws.addEventListener('message', msg => {
            const incoming = JSON.parse(msg.data);
            if (incoming.messages != "") {
                this.setState({messages: incoming.messages});
                notification.open({
                    message: "Updates",
                    description: "You have a new message!"
                });
            }
            if (incoming.events != "") {
                this.setState({events: this.state.events.concat({label: incoming.events})});
                notification.open({
                    message: "Updates",
                    description: "You have new events!"
                });
            }
        });

        window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload(event) {
        if (this.state.username) this.ws.close();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    login(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({logged: true});
                this.initNotifier();
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return this.state.logged ? (
            <div>
                <Card extra={
                    <Avatar style={{backgroundColor: 'orange', verticalAlign: 'middle'}} size="large">
                        {this.state.username}
                    </Avatar>
                } bordered={false} title="Real-time Notifications">
                    <Card type="inner" title="Messages">{this.state.messages}</Card>
                    <Card type="inner" title="Events">
                        <ul>
                            {this.state.events.map((event, index) => {
                                return <li key={index}>{event.label}</li>
                            })}
                        </ul>
                    </Card>
                </Card>
            </div>
        ) : (
            <Form layout="horizontal" onSubmit={this.login}>
                <Card bordered={false}
                      style={
                          {
                              textAlign: 'center',
                              height: '100%',
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              position: 'fixed',
                          }
                      }>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   autoFocus
                                   size="large"
                                   name="username"
                                   onChange={this.handleChange}
                                   type="text"
                                   style={{width: '50%'}}
                                   placeholder="Please enter your name"
                            />
                        )}
                    </FormItem>
                    <Button
                        icon="right"
                        size="large"
                        htmlType="submit"
                        style={{width: '50%'}}
                        type="primary"/>
                </Card>
            </Form>
        );
    }
};

export default Form.create()(App);
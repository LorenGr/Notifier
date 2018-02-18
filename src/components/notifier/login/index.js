import React from 'react';
import {
    Card,
    Form,
    Icon,
    Input,
    Button
} from 'antd';

const FormItem = Form.Item;

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: ''
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    login(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onLogin(this.state.username);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (<Form layout="horizontal" onSubmit={this.login}>
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
        </Form>);
    }
}

export default Form.create()(Login);
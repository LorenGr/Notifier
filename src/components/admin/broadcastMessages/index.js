import React from 'react';
import Broadcaster from '../broadcaster/';
import {
    Button,
    Card,
    Input
} from 'antd';

const {TextArea} = Input;

class BroadcastMessages extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <Broadcaster
                onSubmit={()=>this.state.messages}
                id="messages"
                notification="You have new messages!"
                {...this.props} {...this.state}
            >
                <Card bordered={false} title="Messages">
                <TextArea
                    rows={4}
                    name='messages'
                    onChange={this.handleChange}
                    value={this.state.messages} type="text"/>

                    <Button
                        htmlType="submit"
                        loading={this.state.loading}
                        type="primary"> Send message</Button>
                </Card>
            </Broadcaster>
        );
    }
}

export default BroadcastMessages;
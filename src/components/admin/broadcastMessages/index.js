import React from 'react';
import Broadcaster from '../broadcaster/';

import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

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
                        style={{width:'100%',marginTop:'10px'}}
                        htmlType="submit"
                        type="primary"> Send message</Button>
                </Card>
            </Broadcaster>
        );
    }
}

export default BroadcastMessages;
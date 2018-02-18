import React from 'react';
import Broadcaster from '../broadcaster/';
import {
    Button,
    Card,
    Input
} from 'antd';

const {TextArea} = Input;

class BroadcastEvents extends React.Component {

    constructor() {
        super();
        this.state = {
            events: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <Broadcaster
                onSubmit={()=>this.state.events}
                id="events"
                notification="You have new events!"
                {...this.props}
            >
                <Card bordered={false} title="Events">
                <TextArea
                    rows={4}
                    name='events'
                    onChange={this.handleChange}
                    value={this.state.events} type="text"/>
                    <Button
                        htmlType="submit"
                        loading={this.state.loading}
                        type="primary"> Submit Events</Button>
                </Card>
            </Broadcaster>
        );
    }
}

export default BroadcastEvents;
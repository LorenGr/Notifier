import React from 'react';
import Broadcaster from '../broadcaster/';
import {
    Button,
    Card,
    Input
} from 'antd';

const {TextArea} = Input;

const BroadcastEvents = props => (
    <Broadcaster
        onSubmit={() => ({
            event: 'LEVEL_INCREASE'
        })}
        id="events"
        notification="Congratulations! You increased your level!"
        {...props}
    >
        <Card bordered={false} title="Events">
            <Button
                size="large"
                htmlType="submit"
                icon="trophy"
                style={{
                    fontSize: '20px',
                    height: '100px',
                    width: '100%'
                }}
                type="primary"> Increase Level of all players by 1!</Button>
        </Card>
    </Broadcaster>
);

export default BroadcastEvents;
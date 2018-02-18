import React from 'react';
import {
    Card
} from 'antd';
import {connect} from 'react-redux';

const NotifierEvents = props => (
    <Card type="inner" title="Events">
        <ul>
            {props.events.map((event, index) => {
                return <li key={index}>{event.label}</li>
            })}
        </ul>
    </Card>
);

function mapStateToParams(state) {
    return {
        events: state.events
    }
}

export default connect(mapStateToParams)(NotifierEvents);
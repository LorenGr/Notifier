import React from 'react';
import {
    Card
} from 'antd';
import {connect} from 'react-redux';

const NotifierMessages = props => (
    <Card type="inner" title="Messages">
        <div style={{whiteSpace: 'pre-line'}}>{props.messages}</div>
    </Card>
);

function mapStateToParams(state) {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToParams)(NotifierMessages);
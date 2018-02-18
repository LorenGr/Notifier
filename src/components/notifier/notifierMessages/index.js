import React from 'react';
import {
    Card
} from 'antd';
import {connect} from 'react-redux';

const NotifierMessages = props => (
    <Card type="inner" title="Messages">{props.messages}</Card>
);

function mapStateToParams(state) {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToParams)(NotifierMessages);
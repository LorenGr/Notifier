import React from 'react';
import Modal from 'antd/lib/modal';
import {connect} from 'react-redux';

function showModal(content) {
    Modal.info(
        {
            title: 'You have a new message!',
            content,
            style:{whiteSpace:'pre'}
        }
    );
}

class NotifierMessages extends React.Component {
    render() {
        return null;
    }
    componentDidUpdate() {
        showModal(this.props.messages.content);
    }
}

function mapStateToParams(state) {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToParams)(NotifierMessages);
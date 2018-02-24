import React from 'react';
import {connect} from 'react-redux';
import Notifier from './notifier';
import {
    loginNotifier,
    logoutNotifier,
    setNewMessages,
    setNewEvents,
    setNewGames
} from '../actions/';

function mapStateToProps(state) {
    return {
        logged: state.logged,
        username: state.username
    }
}

export default connect(mapStateToProps, {
    loginNotifier,
    logoutNotifier,
    setNewMessages,
    setNewEvents,
    setNewGames
})(Notifier);
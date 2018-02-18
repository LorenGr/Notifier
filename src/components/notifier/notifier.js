import React from 'react';
import {
    Card,
    message,
} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';

import Login from './login/';
import NotifierHeader from './notifierHeader/';
import NotifierMessages from './notifierMessages/';
import NotifierEvents from './notifierEvents/';
import NotifierGames from './notifierGames/';
import {
    loginNotifier,
    logoutNotifier,
    setNewMessages,
    setNewEvents,
    setNewGames
} from './actions/';

function notify(msg) {
    message.success(msg);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

class Notifier extends React.Component {

    constructor() {
        super();
        this.openSocket = this.openSocket.bind(this);
        this.closeSocket = this.closeSocket.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    openSocket() {
        this.ws = new WebSocket('ws:/localhost:8080');
        this.ws.addEventListener('open', event => {
            this.ws.send(JSON.stringify({id: this.props.username}));
        });
        this.ws.addEventListener('message', msg => {
            const incoming = JSON.parse(msg.data);
            this.props['setNew' + capitalize(incoming.type)](incoming.data); //call action
            notify(incoming.notification);
        });
        window.addEventListener("beforeunload", this.closeSocket); //on browser close
    }

    closeSocket() {
        this.ws.close();
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.closeSocket)
    }

    login(username) {
        this.props.loginNotifier(username);
        this.openSocket();
    }

    logout() {
        this.closeSocket();
        this.props.logoutNotifier();
    }

    render() {
        return this.props.logged ? (
            <Card extra={
                <NotifierHeader onLogout={this.logout}/>
            } bordered={false} title="Real-time Notifications">
                <NotifierMessages/>
                <NotifierEvents/>
                <NotifierGames/>
            </Card>
        ) : (
            <Login onLogin={this.login}/>
        );
    }
};

function mapStateToProps(state) {
    return {
        logged: state.logged
    }
}

export default connect(mapStateToProps, {
    loginNotifier,
    logoutNotifier,
    setNewMessages,
    setNewEvents,
    setNewGames
})(Notifier);
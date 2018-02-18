import React from 'react';
import {
    Card,
    notification,
} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';

import Login from './login/';
import NotifierHeader from './notifierHeader/';
import NotifierMessages from './notifierMessages/';
import NotifierEvents from './notifierEvents/';
import {
    loginNotifier,
    logoutNotifier,
    setNewMessages,
    setNewEvents,
    setNewGames
} from './actions/';

function notify(message, description) {
    notification.open({message, description});
}

class Notifier extends React.Component {

    constructor() {
        super();
        this.onUnload = this.onUnload.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.initNotifier = this.initNotifier.bind(this);
    }

    initNotifier() {
        this.ws = new WebSocket('ws:/localhost:8080');
        this.ws.addEventListener('open', event => {
            this.ws.send(JSON.stringify({id: this.props.username}));
        });
        this.ws.addEventListener('message', msg => {
            const incoming = JSON.parse(msg.data);
            if (incoming.messages && incoming.messages !== "") {
                this.props.setNewMessages(incoming.messages);
                notify("Updates", "You have a new message!");
            }
            if (incoming.events && incoming.events.length) {
                this.props.setNewEvents(incoming.events);
                notify("Updates", "You have new events!");
            }
            if (incoming.events && incoming.games.length) {
                this.props.setNewGames(incoming.games);
                notify("Updates", "You have new games!");
            }
        });
        window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload() {
        this.ws.close();
    }

    logout() {
        this.onUnload();
        this.props.logoutNotifier();
    }

    login(username) {
        this.props.loginNotifier(username);
        this.initNotifier();
    }

    render() {
        return this.props.logged ? (
            <Card extra={
                <NotifierHeader onLogout={this.logout}/>
            } bordered={false} title="Real-time Notifications">
                <NotifierMessages/>
                <NotifierEvents/>
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
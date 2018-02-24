import React from 'react';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import 'antd/dist/antd.css';

import Login from '../login/';
import NotifierHeader from '../notifierHeader/';
import NotifierMessages from '../notifierMessages/';
import NotifierGames from '../notifierGames/';

function notify(msg) {
    message.success(msg);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

const base = String(API_WS);

class Notifier extends React.Component {

    constructor() {
        super();
        this.openSocket = this.openSocket.bind(this);
        this.closeSocket = this.closeSocket.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    openSocket() {
        this.ws = new WebSocket(base);
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
        const notifierBody = (
            <Card style={{
                backgroundColor: '#005bde',
                lineHeight: '37px'
            }}
                  extra={
                      <NotifierHeader onLogout={this.logout}/>
                  } bordered={false}
                  title={'Welcome ' + this.props.username + '! Check out our latest Games'}>
                <NotifierMessages/>
                <NotifierGames/>
            </Card>);


        return this.props.logged ? notifierBody
            : (<Login id="loginForm" onLogin={this.login}/>);
    }
};

export default Notifier;
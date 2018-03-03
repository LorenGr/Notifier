import React from 'react';
import {connect} from 'react-redux';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';

import Login from '../login/';
import NotifierHeader from '../notifierHeader/';
import NotifierMessages from '../notifierMessages/';
import NotifierGames from '../notifierGames/';
import NotifierWebSocket from '../notifierWebSocket/'

import {
    loginNotifier,
    logoutNotifier,
    setNewMessages,
    setNewEvents,
    setNewGames
} from '../actions/';

const base = String(API_WS);

const Notifier = props => {

    const capitalize = string => string.charAt(0).toUpperCase() + string.substring(1);

    const onMessageHandler = data => {
        props['setNew' + capitalize(data.type)](data.data); //call action
        message.success(data.notification);
    };

    const onOpenHandler = ws => {
        ws.send(JSON.stringify({id: props.username}));
    };

    return props.logged
        ? (
            <NotifierWebSocket
                url={base}
                isOpen={props.logged}
                onSocketOpen={onOpenHandler}
                onMessage={onMessageHandler}>
                <Card style={{
                    backgroundColor: '#005bde',
                    lineHeight: '37px'
                }}
                      extra={
                          <NotifierHeader onLogout={props.logoutNotifier}/>
                      } bordered={false}
                      title={'Welcome ' + props.username + '! Check out our latest Games'}>

                    <NotifierMessages/>
                    <NotifierGames/>
                </Card>
            </NotifierWebSocket>
        )

        : (<Login id="loginForm"
                  onLogin={props.loginNotifier}
        />);
};

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
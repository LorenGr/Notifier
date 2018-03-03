import React from 'react';
import PropTypes from 'prop-types';

class NotifierWebSocket extends React.Component {

    constructor(props) {
        super(props);
        this.openSocket = this.openSocket.bind(this);
        this.closeSocket = this.closeSocket.bind(this);
        props.isOpen ? this.openSocket() : this.closeSocket();
    }

    openSocket() {
        this.ws = new WebSocket(this.props.url);
        this.ws.addEventListener('open', event => {
            this.props.onSocketOpen(this.ws);
        });
        this.ws.addEventListener('message', msg => {
            this.props.onMessage(JSON.parse(msg.data));
        });
        window.addEventListener("beforeunload", this.closeSocket); //on browser close
    }

    closeSocket() {
        this.ws && this.ws.close();
        console.log();
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.closeSocket)
    }

    render() {
        return this.props.children || null;
    }
}

NotifierWebSocket.propTypes = {
    onSocketOpen: PropTypes.func,
    onMessage: PropTypes.func,
    isOpen: PropTypes.bool.required,
    url: PropTypes.string.required
};

export default NotifierWebSocket;
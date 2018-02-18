import React from 'react';
import {Card} from 'antd';
import 'antd/dist/antd.css';
import {Button} from "antd/lib/index";
import BroadcastEvents from "./broadcastEvents/";
import BroadcastMessages from "./broadcastMessages/";
import BroadcastGames from "./broadcastGames/";

class Admin extends React.Component {

    constructor() {
        super();
        this.onUnload = this.onUnload.bind(this);
        this.ws = new WebSocket('ws:/localhost:8080');
        this.ws.addEventListener('open', event => {
            this.ws.send(JSON.stringify({id: 'admin'}));
        });
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload(event) {
        this.ws.close();
    }

    render() {
        return (
            <Card bordered={false} title="Notifications Broadcaster">
                <BroadcastEvents/>
                <BroadcastMessages/>
                <BroadcastGames/>
            </Card>
        );
    }
};

export default Admin;
import React from 'react';
import {Card,Tabs} from 'antd';
import 'antd/dist/antd.css';
import {Button} from "antd/lib/index";
import BroadcastEvents from "./broadcastEvents/";
import BroadcastMessages from "./broadcastMessages/";
import BroadcastGames from "./broadcastGames/";

const { TabPane } = Tabs;
const base = String(API_URL);
class Admin extends React.Component {

    constructor() {
        super();
        this.onUnload = this.onUnload.bind(this);
        this.ws = new WebSocket(base);
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
                <Tabs>
                    <TabPane key="1" tab="Games">
                        <BroadcastGames/>
                    </TabPane>
                    <TabPane key="2" tab="Events">
                        <BroadcastEvents/>
                    </TabPane>
                    <TabPane key="3" tab="Messages">
                        <BroadcastMessages/>
                    </TabPane>
                </Tabs>
            </Card>
        );
    }
};

export default Admin;
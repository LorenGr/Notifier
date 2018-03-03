import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {WebSocket, Server} from 'mock-socket';
import {shallow} from 'enzyme';
import NotifierWebSocket from '../index';

const wsBase = 'ws://localhost:3001';

Enzyme.configure({adapter: new Adapter()});

global.WebSocket = WebSocket;

describe('Test Notifier WebSocket connection', () => {

    test("Should call onSocketOpen callback", done => {
        let _ws = null;
        const mockServer = new Server(wsBase);
        const props = {
            isOpen: true,
            url: wsBase,
            onSocketOpen: socketConn => {
                _ws = socketConn;
            }
        };
        const spy = jest.spyOn(props, 'onSocketOpen');
        shallow(<NotifierWebSocket {...props} />);

        mockServer.on('connection', server => {
            expect(spy).toHaveBeenCalled();
            mockServer.close();
            done();
        });
    });

    test("Should call onMessage callback", done => {
        const mockServer = new Server(wsBase);
        const props = {
            isOpen: true,
            url: wsBase,
            onMessage: data => {
                return null;
            },
            onSocketOpen: () => {
            }
        };
        const spy = jest.spyOn(props, 'onMessage');
        shallow(<NotifierWebSocket {...props} />);

        const payload = {
            type: 'messages',
            data: []
        };

        mockServer.on('connection', server => {
            mockServer.send(JSON.stringify(payload));
            expect(spy).toHaveBeenCalledWith(payload);
            mockServer.close();
            done();
        });
    });
});


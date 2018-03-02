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

    test("Should emit message to onMessage handler", () => {

        const mockServer = new Server(wsBase);

        const callbacks = {
            onMessage: data => {
                return null;
            },
        };
        const spy = jest.spyOn(callbacks, 'onMessage');

        const props = {
            isOpen: true,
            url: wsBase,
            onMessage: callbacks.onMessage
        };
        const wrapper = shallow(<NotifierWebSocket {...props} />);

        mockServer.on('connection', server => {
            mockServer.send({
                type: 'messages',
                data: {
                    type: 'messages',
                    data: []
                }
            });

            expect(spy).toHaveBeenCalled();
            done();
        });
    });
});


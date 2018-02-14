'use strict';

const session = require('express-session');
const express = require('express');
const http = require('http');
const uuid = require('uuid');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.post('/broadcast', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(req.body);
        }
    });
});

app.get('/open', (req, res) => {
    wss.on('connection', function connection(ws) {

        ws.on('open', function opening(message) {
            res.send('Connection Open');
        });

        ws.on('message', function incoming(message) {
            ws.send('received:' + message);
        });
    });
});


server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});
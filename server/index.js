'use strict';

const session = require('express-session');
const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();

const lookup = [];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.post('/broadcast', (req, res) => {
    wss.clients.forEach(function each(client, cnt) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(req.body[0]));
        }
    });
    res.send("Broadcasted");
});

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('../public/index.html');
});
app.get('/admin', (req, res) => {
    res.render('../public/admin');
});

wss.on('connection', function connection(ws) {
    ws.on('message', function opening(message) {
        const id = JSON.parse(message).id;
        if (id) {
            ws.id = id;
            lookup.push({id: ws.id, socket: ws});
        }
    });
    ws.on('close', function () {
        ws.close();
        const closingConnection = lookup.find(conn => conn.id === ws.id);
        lookup.splice(lookup.indexOf(closingConnection), 1);
    });
});


server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// in: {"test": "Your are an ass"}
// out: {"isHurtful": true}
app.post('/aiReact', jsonParser, function (req, res) {
    console.log(req.body);
    const data = req.body.text
    const bad = hurtful.includes(data)
    res.send({ hurtful: bad });
});


io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});




const hurtful = ["i will kill you", "i will kick your butt", "you are idiot"]

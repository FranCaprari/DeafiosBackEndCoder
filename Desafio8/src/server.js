import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import FakeContainer from './containers/fakeContainer';
import fsContainer from './containers/fsContainer';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const productsApi = new FakeContainer();
const messagesApi = new fsContainer('./mensajes.json');

io.on('connection', async(socket) => {
    console.log('Usuario conectado');
    const chat = await messagesApi.getNormalizedMensajes();
    console.log(chat);
    socket.emit('chat', chat);
    socket.on('new-message', async (data) => {
        await messagesApi.save(data);
        const chat = await messagesApi.getNormalizedMensajes();
        io.sockets.emit('chat', chat);
    });
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/api/productos-test', (req, res) => {
    res.json(productsApi.getProducts(10));
});

const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => {
    console.log("CONECTADO!");
});

srv.on('error', (error) => console.log(error));
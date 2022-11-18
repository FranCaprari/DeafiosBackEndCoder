import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import FakeContainer from './containers/fakeContainer';
import fsContainer from './containers/fsContainer';

const app = express();
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: 'mongodb+srv://cvarela:never123@cluster0.hz9hxot.mongodb.net/sessions',
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
		}),

		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 10 * 1000 * 60,
		},
	})
);


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
const auth = (req, res, next) => {
    if(req.session.usuario){
        next();
    } else{
        res.redirect('/login');
    }
};
const isLogged = (req, res, next) => {
    if(req.session.usuario){
        next();
    }else{
        res.redirect('/');
    }
};
app.get('/login', isLogged, (req, res) => {
    res.sendFile(path.resolve('public', 'login.html'));
});
app.post('/login', (req, res) => {
    req.session.usuario = req.body.usuario;
    res.redirect('/');
});

app.get('/username', (req, res) => {
    res.json(req.session.usuario);
});
app.get('/logout', (req, res) => {
    const usuario = req.session.usuario;
    req.session.destroy(function (err){
        if(err) return next(err);
        res.json(usuario);
    });
});



app.use(auth);
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
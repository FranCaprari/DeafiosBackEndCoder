import express from 'express';
import passport from 'passport';
import { session } from 'passport';



const app = express();


app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: "soysecret",
    resave: false,
    saveUnitialized: false,
    rolling: true
}));


app.listen(8080, () => {
    console.log('Server on');
});
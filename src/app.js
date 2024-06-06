import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import viewsRouter from './routes/views.router.js';
import __dirname from "./util.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.engine('handlebars', handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());

app.use('/',viewsRouter);

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const socketServer = new Server(server);

const messages = [];

socketServer.on('connection', (socketClient) =>{
    console.log('Cliente Conectado');

    socketClient.on("message",data =>{
        messages.push(data);
        socketServer.emit('log',messages);
    });
})
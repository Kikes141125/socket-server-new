import Server from './classes/server';
import router from './routes/router';
import cors from 'cors';
// import bodyParser from 'body-parser';
import express from 'express';

const server= Server.instance;


//Passing body parser
server.app.use( express.urlencoded ( {extended:true} ) );
server.app.use(express.json());

//CORS
server.app.use( cors( { origin:true, credentials: true } ));

server.app.use( '/', router )

server.start( ()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
} )
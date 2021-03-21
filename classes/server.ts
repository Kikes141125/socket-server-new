import express from 'express';
import { SERVER_PORT, URL_INPUT } from '../global/environment';
import http from 'http';
import * as socket from '../sockets/socket'
import socketIO, { Socket } from 'socket.io';


export default class Server{

    private static _instance:Server;
    public app:express.Application;
    public port:number;
    public io: socketIO.Server;
    private httpServer:http.Server;

    private constructor(){
        this.app=express();
        this.port=SERVER_PORT;
        this.httpServer=new http.Server(this.app);
        this.io=new socketIO.Server(this.httpServer,
            {
                cors:{
                    origin:URL_INPUT,
                    methods:['GET','POST']
                }
            });
        // this.io=new socketIO.Server(this.httpServer)
        this.escucharSockets();

    }

    public static  get instance(){
        return this._instance || (this._instance= new this());
    }
    
    private escucharSockets(){
        console.log('Escuchando conexiones ');
        this.io.on('connection',(cliente:Socket) => {
            console.log('Cliente conectado');
        
            //Mensajes
            socket.mensaje(cliente,this.io);
            // cliente.on('disconnect',()=>{
            //     console.log('Cliente desconectado');
            // })
            socket.desconectar(cliente);
        } )
    }

    start( callback:any ){
        this.httpServer.listen(this.port,callback);
    }
}
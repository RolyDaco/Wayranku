
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



class Server {

    constructor() { // this se usa para llamar a una propiedad de la clase
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.app.set('view engine', 'ejs');
        this.app.set('models', __dirname + '/views');

        //this.io     = require('socket.io')( this.server );
      
        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();


        //Sockets

        this.sockets();

    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
        
        
        // Directorio Público
        this.app.use(express.static(__dirname + '/public'));
        
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        
    }

    routes() {

        this.app.use('/', require('../routes/lugar'));
        
                
    }   
       //Sockets // payload se recomienda para objetos literales o primitivos
    sockets() {

        //this.io.on('connection', socketController);
    }

    listen() { // Para poner a nuestro servidor a escuchar peticiones
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

    

}


module.exports = Server
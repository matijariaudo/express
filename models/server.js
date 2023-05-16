const express=require('express')
const path=require('path')
//const fileUpload = require('express-fileupload');
//const router = require('../routes/api');

class Server{
    constructor(){
        this.app=express()
        this.middlewares()
        this.router()
    }
    middlewares(){
        //SI QUIERO RECIBIR ARCHIVO
        //this.app.use(fileUpload());
        //TO JSON
        this.app.use(express.json())
        //ESTABLECES CARPETA BASE
        this.app.use(express.static(path.join(__dirname,"../public")))
        //AGREGAR DATOS
    }

    router(){
        //API
        //this.app.use('/api',router);
        //Ruteo de diferentes sitios, por ej acceso
        this.app.get('/acceso',(req,res)=>{res.sendFile(path.join(__dirname,"../public/acceso.html"))})
        this.app.get('*',(req,res)=>{res.sendFile(path.join(__dirname,"../public/index.html"))})
    }
    
    //Ejemplo de como validar una función pasando parámetros. Ejemplo cuando necesito saber si es uno o otro
    valorIn(...valor){
        return (req,res,next)=>{
            console.log(req.method,req.originalUrl,)
            if(valor.includes(req.params.data)){return res.json({error:"este valor no está permitido"});}
            next()
        }
    }

    listen(){
        const port = process.env.PORT || 3000;
        this.app.listen(port,()=>{console.log("Escuchando puerto "+port)})
    }
}


module.exports={Server}
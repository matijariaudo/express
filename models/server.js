const express=require('express')
const path=require('path')
const { Wsp } = require('./wsp')
//const { Wsp } = require('./wsp')
//const fileUpload = require('express-fileupload');
//const router = require('../routes/api');

class Server{
    constructor(){
        this.app=express()
        this.middlewares()
        this.router()
        this.wsp=new Wsp();
    }
    middlewares(){
        //SI QUIERO RECIBIR ARCHIVO
        //this.app.use(fileUpload());
        //TO JSON
        this.app.use(express.json())
        //ESTABLECES CARPETA BASE
        this.app.use(express.static(path.join(__dirname,"../public")));
        //AGREGAR DATOS
    }

    router(){
        //API
        //this.app.use('/api',router);
        this.app.use('/api',(req,res)=>{
            res.json({qr:this.wsp.QR,qr_date:this.wsp.QR_Date})
            //res.json({nro:this.wsp.nro,qr:this.wsp.qr});
        });
        this.app.use('/:aa',(req,res)=>{
            console.log(req.params.aa);
            this.wsp.send({to:"5493406460886",msg:req.params.aa})
            res.json({status:"OK"});
        });
        //Ruteo de diferentes sitios, por ej acceso
        this.app.get('/acceso',(req,res)=>{res.sendFile(path.join(__dirname,"../public/acceso.html"))})
        this.app.get('*',(req,res)=>{console.log(new Date());res.sendFile(path.join(__dirname,"../public/index.html"))})
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
        this.comenzar_wsp();
    }

    comenzar_wsp(){
        //this.wsp=new Wsp('5493406460886');;
    }
}


module.exports={Server}
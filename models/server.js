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
                if(!this.wsp.QR_date){
                return res.json({qr:"Aún no iniciado",qr_date:new Date()})
            }
            console.log((new Date()-new Date(this.wsp.QR_date))/1000)
            if((new Date()-new Date(this.wsp.QR_date))/1000>30 && this.wsp.QR.length>25){
                this.wsp=new Wsp();
                return res.json({qr:"Reiniciando",qr_date:new Date()})
            }
            return res.json({qr:this.wsp.QR,qr_date:this.wsp.QR_date})
            //res.json({nro:this.wsp.nro,qr:this.wsp.qr});
        });
        this.app.use('/:aa',(req,res)=>{
            if(req.params.aa!="Cronjob" && req.params.aa.indexOf(".ico")<0){
                this.wsp.send({to:"5493406460886",msg:req.params.aa})
            }else{
                req.params.aa.indexOf(".ico")<0?console.log(req.params.aa):true; 
            }
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
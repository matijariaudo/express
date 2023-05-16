const { Client } = require('whatsapp-web.js');

class Wsp{
    qr="";
    nro=0;
    constructor(nro){
        this.nro=nro;
        this.qr="-"
        this.comenzar();
    }
    comenzar(){
        this.client = new Client();
        console.log("Comenzando con ",this.nro);
        this.client.on('qr', (qr) => {
            this.qr=qr; 
            console.log('QR RECEIVED', qr);
        });
        this.client.on('ready', () => {
            console.log('Client is ready!');
        });
        this.client.on('message',msg=>{
            console.log(msg)
        })
        this.client.initialize();
    }
}

module.exports={Wsp};

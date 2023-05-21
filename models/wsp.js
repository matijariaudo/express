const { rejects } = require("assert");
const { resolve } = require("path");
const { Client , LocalAuth} = require("whatsapp-web.js");

class Wsp{
    nro="5493406460886";
    QR="-";QR_date=new Date();
    client = new Client({authStrategy: new LocalAuth({ clientId: this.nro }), puppeteer: {headless: true,args: ['--no-sandbox']}});
    constructor(){
        this.client.on('qr', (qr) => {
        this.QR=qr;
        this.QR_Date=new Date();
        });
        this.client.on('ready', () => {
        console.log('Client'+this.nro+'is ready!');
        });
        this.client.on('message',msg=>{
        console.log(msg.from,msg.body)
        })
        console.log('Inicializandos '+this.nro);
        this.client.initialize();
    }
    async status(){
        try {
            const estado=await this.client.getState();
            return estado;
        } catch (error) {
            return null;
        }
        
    }

    async send({to,msg,url}){
        return new Promise(async(resolve, reject) => {
            if(!await this.status()){console.log("Se ha desconectado, o aun no está listo");return true;}
            const chatId = to + "@c.us";
            console.log("Enviando :",chatId," : ",msg)
            if(url){this.client.sendMessage(chatId, await MessageMedia.fromUrl(url));}
            this.client.sendMessage(chatId, msg);
            resolve(true);    
        });
    }
}


module.exports={Wsp}

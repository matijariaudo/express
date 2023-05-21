const { Client , LocalAuth} = require("whatsapp-web.js");

class Wsp{
    nro="5493406460886";
    QR="-";QR_date=new Date();
    client = new Client({authStrategy: new LocalAuth({ clientId: this.nro }), puppeteer: {headless: true,args: ['--no-sandbox']}});
    constructor(){
        this.client.on('qr', (qr) => {
        this.QR=qr;
        this.ready=false;
        this.QR_Date=new Date();
        console.log('QR RECEIVED', this.QR);
        });
        this.client.on('ready', () => {
        this.ready=true;
        console.log('Client is ready!');
        });
        this.client.on('message',msg=>{
        console.log(msg.from,msg.body)
        })
        this.client.initialize();
    }
    async send({to,msg,url}){
        return new Promise(async(resolve, reject) => {
            if(!this.ready){resolve(true);return true;}
            const chatId = to + "@c.us";
            if(url){
                const media=await MessageMedia.fromUrl(url)
                this.client.sendMessage(chatId, media);
            }
            console.log(chatId,msg)
            this.client.sendMessage(chatId, msg);
            resolve(true)       
        })
    }
}


module.exports={Wsp}

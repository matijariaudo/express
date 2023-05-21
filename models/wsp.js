const { Client , LocalAuth} = require("whatsapp-web.js");

class Wsp{
    nro="5493406460886";
    QR="";QR_date=new Date();
    client = new Client({authStrategy: new LocalAuth({ clientId: this.nro }), puppeteer: {headless: true,args: ['--no-sandbox']}});
    constructor(){
        this.client.on('qr', (qr) => {
        this.QR=qr;
        this.QR_Date=new Date();
        console.log('QR RECEIVED', this.QR);
        });
        this.client.on('ready', () => {
        console.log('Client is ready!');
        });
        this.client.on('message',msg=>{
        console.log(msg.from,msg.body)
        })
        this.client.initialize();
    }
}


module.exports={Wsp}

const express = require("express");
const { Server } = require("./models/server");
const { Client , LocalAuth} = require("whatsapp-web.js");
console.clear()

const app=new Server();
app.listen();
  
let QR;
nro="5493406460886";
const client = new Client({authStrategy: new LocalAuth({ clientId: nro }), puppeteer: {headless: true,args: ['--no-sandbox']}});
console.log("Comenzando con: ",nro);
client.on('qr', (qr) => {
  QR=qr; 
  console.log('QR RECEIVED', qr);
});
client.on('ready', () => {
  console.log('Client is ready!');
});
client.on('message',msg=>{
  console.log(msg.from,msg.body)
})
client.initialize();



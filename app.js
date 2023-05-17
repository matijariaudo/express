const express = require("express");
const { Server } = require("./models/server");
const { Client } = require("whatsapp-web.js");
console.clear()

const app=new Server();
app.listen();

let QR;
const client = new Client();
console.log("Comenzando con ","33333");
client.on('qr', (qr) => {
QR=qr; 
console.log('QR RECEIVED', qr);
});
client.on('ready', () => {
console.log('Client is ready!');
});
client.on('message',msg=>{
console.log(msg)
})
client.initialize();



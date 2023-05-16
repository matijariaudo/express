const express = require("express");
const { Client } = require('whatsapp-web.js');
const { Server } = require("./models/server");
console.clear()

const app=new Server();
app.listen();


let QR="Sin Qr"
const client = new Client();
client.on('qr', (qr) => {
    QR=qr; 
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

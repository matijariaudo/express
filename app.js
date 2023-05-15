const express = require("express");
const { Client } = require('whatsapp-web.js');
const app = express();
const yt = require("yt-converter");
const port = process.env.PORT || 3001;
console.clear()

app.get("/:id", (req, res) => {console.log(req.params);res.type('html').send(create_html(req.params.id,QR))});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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

descargar=async(url)=>{
  yt.convertAudio({
      url,
      itag: 140,
      directoryDownload: __dirname,
      title: "Your title here"
  },(a)=>{console.log("On Data",a);},()=>{console.log("On Close");})
}

descargar('https://www.youtube.com/watch?v=GUf81ofAZV0&list=RDEMC8fzeVShZE57exsbYjFEsg&start_radio=1&rv=Q3mcZcJJu7k');



create_html=(text,qr)=>{
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Hello from Render!</title>
      <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
      <script>
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            disableForReducedMotion: true
          });
        }, 500);
      </script>
      <style>
        @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
        @font-face {
          font-family: "neo-sans";
          src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
          font-style: normal;
          font-weight: 700;
        }
        html {
          font-family: neo-sans;
          font-weight: 700;
          font-size: calc(62rem / 16);
        }
        body {
          background: white;
        }
        section {
          border-radius: 1em;
          padding: 1em;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-right: -50%;
          transform: translate(-50%, -50%);
        }
      </style>
    </head>
    <body>
      <section>
        Hello ${text}!
        <p style='font-size:12px;font-weight:100'>${qr}</p>
      </section>
    </body>
  </html>
  `
  return html;
}

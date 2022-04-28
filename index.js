const express = require('express')
const cors = require("cors");
const app = express()

const bodyParser = require('body-parser')

// https
// const fs = require('fs')
// const https = require('https');
// const server = https.createServer({
//   key:fs.readFileSync(__dirname+"/certificate/key.pem"),
//   cert:fs.readFileSync(__dirname+"/certificate/cert.pem")
// },app);
// const port = 3443 
const http = require('http');
const server = http.createServer(app);
const port = 3000 

const { initRoutes } = require('./app/routes')

app.use(express.static(__dirname+'/public'));

const { Server } = require("socket.io");
const { initSocketConnection } = require('./app/websocket_connections');
const { mClient, mClientTest } = require('./app/helpers/helper');
const io = new Server(server);


app.use(bodyParser.json())
const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

require('./app/routes')
// 
initRoutes(app)

initSocketConnection(io)



// mClientTest()
server.listen(port, () => {
  console.log(`🚀 listening on port ${port} 🚀`)
})


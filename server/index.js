//#region HTTP server
const readfile =  require("fs").readFileSync;
let file;
function load(){
    file = {
        home: readfile("src/index.html","utf-8"),
        vue: readfile("src/vue.min.js","utf-8"),
        script: readfile("src/script.js","utf-8"),
        style: readfile("src/style.css","utf-8")
    }
}
function write(res,mime,content){
    res.writeHead(200,{"Content-Type":mime});
    res.write(content);
}
let ips = [];
let intr = require("os").networkInterfaces();
for(let dev in intr){
    intr[dev].forEach(det=>{
        if(!det.internal){
            if(det.family == "IPv4"){
                ips.push(det.address);
            }
        }
    })
}
require("http").createServer((req,res) => {
    switch(req.url){
        case "/":
            load();
            write(res,"text/html",file.home);
            break;
        case "/vue":
            write(res,"text/javascript",file.vue);
            break;
        case "/style":
            write(res,"text/css",file.style);
            break;
        case "/script":
            write(res,"text/javascript",file.script);
            break;
        case "/ip":
            write(res,"text/javascript","const ip = '" + ips[1] + "'");
            break;
        default:
            res.writeHead(404);
            break;
    }
    res.end();
}).listen(2650);
//#endregion

const WebSocket = require("ws").Server;
const wsserver = new WebSocket({port: 1537});
wsserver.on("connection", ws => 
    ws.on("message", msg => {
        let msgtext = "";
        console.log(msg)
        msg.forEach(e=>{
            msgtext += String.fromCharCode(e);
        })
        wsserver.clients.forEach(client => client.send(msgtext));
    })
)
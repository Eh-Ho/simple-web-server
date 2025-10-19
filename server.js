const http = require('http');
const fs = require('fs');
const process = require('process');
const path = require('path');
const mime = require('mime-types');

const server = http.createServer((req,res)=>{
    filepath = path.join(process.cwd(),'web',req.url);
    let file_status

    try{
        file_status = fs.lstatSync(filepath)
    }catch(err){
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write(fs.readFileSync(path.join(process.cwd(),'web','404.html')));
        return res.end()
    }

    if(file_status.isFile()){
        data = fs.readFileSync(filepath)
        type = mime.contentType(path.extname(filepath))
        res.writeHead(200,{'Content-Type':type});
        res.write(data)
        res.end()
    }else if(!file_status.isFile()){
        res.writeHead(302,{'location':req.url + 'index.html'})
        res.end()   
    }else{
        res.writeHead(500,{'content-type':'text/html'})
        res.write(fs.readFileSync(path.join(process.cwd(),'web','500.html')))
        res.end()
    }
    
})


server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
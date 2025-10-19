const http = require('http');
const fs = require('fs');
const process = require('process');
const path = require('path');
const mime = require('mime-types');

const server = http.createServer((req,res)=>{
    filepath = path.join(process.cwd(),'web',req.url);

    try{
        fs.lstatSync(filepath)
        let data = fs.readFileSync(filepath)

        type = mime.contentType(path.extname(filepath))
        res.writeHead(200,{'Content-Type':type});
        res.write(data)

    }catch(err){
        console.log(err)
        res.end();
    }

    res.end()

})


server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
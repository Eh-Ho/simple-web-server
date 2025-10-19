const http = require('http');
const fs = require('fs');
const process = require('process');
const path = require('path');

const server = http.createServer((req,res)=>{
    filepath = path.join(process.cwd(),'web',req.url);

    try{

        fs.lstatSync(filepath)
        let data = fs.readFileSync(filepath)
        res.writeHead(200,{'Content-Type':'text/html'});
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
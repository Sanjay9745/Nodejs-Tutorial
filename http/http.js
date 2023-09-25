const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req,res)=>{
    const url = req.url;
    const routes = {
        '/': 'index.html',
        '/about': 'about.html',
        '/contact': 'contact.html',
    }
    if(routes[url]){
        res.writeHead(200, {'Content-Type': 'text/html'});
       
        fs.readFile(path.join(__dirname, routes[url]), 'utf8', (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }else{
        res.end('404 not found')
    }
})

server.listen(8080, 'localhost', () => {
    console.log('Server is listening on port 8080');
})
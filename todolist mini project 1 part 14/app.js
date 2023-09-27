const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    const url = req.url.split("?")[0];
    
    if (url === "/") {
        fs.readFile(path.join(__dirname, "index.html"), (err, content) => {
            if (err) throw err;
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(content);
        })
    }else if(url === "/add"){
        const task = req.url.split("?")[1].split("=")[1];
        fs.appendFile("tasks.txt", task + "\n", (err) => {
            if (err) throw err;
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("Task added successfully");
        });
    }else if(url === "/list"){
        fs.readFile("tasks.txt", (err, content) => {
            if (err) throw err;
            const tasks = content.toString().split("\n");
       
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end(JSON.stringify({ tasks }));
        })
    }else if(url === "/delete"){
        const index = req.url.split("?")[1].split("=")[1];
        fs.readFile("tasks.txt","utf8", (err, content) => {
            if(err) throw err;
            const tasks = content.split("\n");
            tasks.splice(index, 1);
            fs.writeFile("tasks.txt", tasks.join("\n"), (err) => {
                if(err) throw err;
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end("Task deleted successfully");
            })
        })
    }else{
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Page not found");
    }

});

server.listen(3000, () => console.log("Server running on port 3000"));
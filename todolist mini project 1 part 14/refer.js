const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = req.url.split("?")[0];
  
    if (url === "/") {
        // Serve the HTML file
        fs.readFile("index.html", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 Internal Server Error");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);

            }
        });
    } else if (url === "/tasks") {
        // Simulate tasks stored on the server (in-memory)
        const tasks = []
        fs.readFile("tasks.txt", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 Internal Server Error");
            } else {
                
                data.split("\n").forEach((task) => {
                   
                    if(task !== ""){
                        tasks.push(task);
                    }
                })
                console.log(tasks);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ tasks }));
            }
        })
    } else if(url ==="/add"){

        const task = req.url.split("?")[1].split("=")[1];
        fs.appendFile("tasks.txt", task + "\n", (err) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 Internal Server Error");
            } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Task added successfully");
            }
        })
    }
    else if(url ==="/delete"){
        const index = req.url.split("?")[1].split("=")[1];
        fs.readFile("tasks.txt", "utf8", (err, data) => {
            if (err){
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 Internal Server Error");
            }else{
                const tasks = data.split("\n");
                tasks.splice(index, 1);
                fs.writeFile("tasks.txt", tasks.join("\n"), (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.end("500 Internal Server Error");
                    } else {
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end("Task deleted successfully");
                    }
                })
            }
        })


    }
    else{
        // Handle other routes
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

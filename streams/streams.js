console.time("streams")
const fs = require("fs")

// read a file using fs.readFile
//time 1.7s
// fs.readFile("rockyou.txt", "UTF-8", (err, text) => {
//     if (err) throw err
//     //write file
//     fs.writeFile("rockyou-copy.txt", text, (err) => {
//         if (err) throw err
//         console.log("file written")
//     })

//     console.timeEnd("streams")
// })

//stream
// readstream


// // Readable stream without specifying the encoding
// const readStream = fs.createReadStream("rockyou.txt", "utf8");
// const writeStream = fs.createWriteStream("write.txt");

// // On data event
// readStream.on("data", (chunk) => {
//     // 'chunk' is a buffer

//     // Write the chunk to the write stream
//     writeStream.write(chunk);
// });

// // Close the write stream to finish writing when all data has been processed
// readStream.on("end", () => {
//     writeStream.end();
// });

// // Handle errors, if any occur
// readStream.on("error", (err) => {
//     console.error("Error reading data:", err);
// });

// writeStream.on("error", (err) => {
//     console.error("Error writing data:", err);
// });

// // Listen for the 'finish' event to know when the writing is complete
// writeStream.on("finish", () => {
//     console.log("Data has been written to the file.");
//     console.timeEnd("streams")
// });


//pipe 

const readStream = fs.createReadStream("rockyou.txt", "utf8");
const writeStream = fs.createWriteStream("write.txt");

readStream.pipe(writeStream)

writeStream.on("finish", () => {
    console.log("Data has been written to the file.");
    console.timeEnd("streams")
}
)
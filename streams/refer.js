// console.time("myCode");
// const fs = require("fs");

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
// });
// console.timeEnd("myCode");

// fs.readFile("rockyou.txt", "utf8", (readErr, data) => {
//     if (readErr) {
//         console.error("Error reading data:", readErr);
//         return;
//     }

//     // Write the data to "write.txt"
//     fs.writeFile("write.txt", data, "utf8", (writeErr) => {
//         if (writeErr) {
//             console.error("Error writing data:", writeErr);
//             return;
//         }

//         console.log("Data has been written to the file.");
//     });
// console.timeEnd("myCode");
// });

// Create a readable stream from "read.txt"
// const readStream = fs.createReadStream("rockyou.txt", "utf8");

// // Create a writable stream to "write.txt"
// const writeStream = fs.createWriteStream("write.txt", "utf8");

// // Pipe the data from the readable stream to the writable stream
// readStream.pipe(writeStream);

// // Listen for the 'finish' event to know when the writing is complete
// writeStream.on("finish", () => {
//     console.log("Data has been written to the file.");
// });

// // Handle errors, if any occur
// readStream.on("error", (err) => {
//     console.error("Error reading data:", err);
// });

// writeStream.on("error", (err) => {
//     console.error("Error writing data:", err);
// });


// console.timeEnd("myCode");
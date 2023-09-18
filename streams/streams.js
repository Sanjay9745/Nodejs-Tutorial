console.time("code");
const fs = require("fs");

//read file
//time 1.1s
// fs.readFile("rockyou.txt", "utf8",(readErr, data) => {
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
// console.timeEnd("code")
// });

// create ReadStream

// const ReadStream = fs.createReadStream("rockyou.txt","utf8");
// const WriteStream = fs.createWriteStream("write.txt","utf8");
// ReadStream.on("data", (chunk) => {
//   WriteStream.write(chunk);
// });

// ReadStream.on("end", () => {
//     WriteStream.end();
// }
// );
// //1s
// WriteStream.on("finish", () => {
//     console.log("Data has been written to the file.");
//     console.timeEnd("code");
// });


// pipe

// const ReadStream = fs.createReadStream("rockyou.txt","utf8");
// const WriteStream = fs.createWriteStream("write.txt","utf8");

// ReadStream.pipe(WriteStream);
// //ls
// WriteStream.on("finish", () => {
//     console.log("Data has been written to the file.");
//     console.timeEnd("code");
// });
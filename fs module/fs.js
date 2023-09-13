const fs = require('fs');

//read

const data = fs.readFileSync('test.txt', 'utf8');
console.log(data);
fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});


//write
fs.writeFileSync('test.txt', 'Hello Node.js');
fs.writeFile('test.txt', 'Hello Node.js', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

//append 
fs.writeFileSync('test.txt', 'Hello Node.js', {flag: 'a'});

//don't use this
// for(var i = 0 ; i<10000;i++){
//     fs.writeFileSync('test.txt', 'Hello Node.js', {flag: 'a'});
//    }
   


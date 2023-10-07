
// Encrypt data using XOR
function encryptData(data, key) {
    console.log(data);
let encrypted = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i++) {
    encrypted[i] = data[i] + key;
}
return encrypted;
}


function decryptData(data, key) {
    let encrypted = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i++) {
    encrypted[i] = data[i] - key;
}
return encrypted;
}
// Example usage:
const originalData = Buffer.from('Hello', 'utf-8');

// Encrypt the data
const encryptedData = encryptData(originalData, 10);
const decryptedData = decryptData(encryptedData, 10);


console.log('Original Data:', originalData.toString('utf-8'));
console.log('Encrypted Data:', encryptedData.toString('utf-8'));

console.log('Decrypted Data:', decryptedData.toString('utf-8'));


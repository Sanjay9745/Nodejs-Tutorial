function encryptData(data, key) {
  const bufferData = Buffer.from(data, "utf-8");
  const encrypted = Buffer.alloc(data.length);

  for (var i = 0; i < data.length; i++) {
    encrypted[i] = bufferData[i] + key;
  }
  return encrypted.toString("utf-8");
}

function decryptData(data,key){
    const bufferData = Buffer.from(data, "utf-8");
    const encrypted = Buffer.alloc(data.length);
  
    for (var i = 0; i < data.length; i++) {
      encrypted[i] = bufferData[i] - key;
    }
    return encrypted.toString("utf-8");
}

const originalData = "hello";

const encryptedData = encryptData(originalData, 10);
const decryptedData = decryptData(encryptedData, 10);

module.exports = {
    encryptData,
    decryptData
}
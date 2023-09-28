
// const jsonData = `{"name":"John Doe","age":34,"location":"New York"}`

// const data = JSON.parse(jsonData)
const fs = require('fs')

const data = {
    name: 'sourav',
    age: 14,
    location: 'Kerala'
  }

  const jsonData = JSON.stringify(data)
fs.readFile('data.json', 'utf-8', (err, json) => {
    if (err) {
        console.log(err)
    } else {
        let jsonData = JSON.parse(json)
       jsonData = [...jsonData, data]
       const newData = JSON.stringify(jsonData)
        fs.writeFile('data.json',newData , err => {
            if (err) {
                console.log(err)
            } else {
                console.log('Data written to file')
            }
        })
        
    }
})
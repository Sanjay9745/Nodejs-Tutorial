
//1
// myModule.js
// module.exports = {
//   greet: function() {
//     console.log('Hello!');
//   },
//   name: 'John',
// };


// const myModule = require('./myModule');
// myModule.greet(); // Outputs: Hello!
// console.log(myModule.name); // Outputs: John

//2

// mathOperations.js
// module.exports.add = function(a, b) {
//     return a + b;
//   };
  
//   module.exports.subtract = function(a, b) {
//     return a - b;
//   };

//   const math = require('./mathOperations');
// console.log(math.add(5, 3)); // Outputs: 8
// console.log(math.subtract(5, 3)); // Outputs: 2



//3
// myModule.js
// module.exports = function() {
//     console.log('This is a custom function.');
//   };

  
//   const myFunction = require('./myModule');
// myFunction(); // Outputs: This is a custom function.



//4

// config.js
// const databaseConfig = {
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: 'password',
//   };
  
//   module.exports = databaseConfig;

  

//   const config = require('./config');
// console.log(config.host); // Outputs: localhost



//5
// MyClass.js
// class MyClass {
//     constructor(name) {
//       this.name = name;
//     }
  
//     sayHello() {
//       console.log(`Hello, ${this.name}!`);
//     }
//   }
  
//   module.exports = MyClass;

  
//   const MyClass = require('./MyClass');
// const obj = new MyClass('John');
// obj.sayHello(); // Outputs: Hello, John!


//6
// myModule.js
// class MyModule {
//     constructor() {
    
//       // ...

//     }
  
//     // ...
//   }
  
//   exports.default = MyModule;

//   const MyModule = require('./myModule').default;
// const obj = new MyModule();

//7


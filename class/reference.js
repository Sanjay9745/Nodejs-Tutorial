
// // Path: reference.js
// //class
// class Main{
//     constructor(){
//         this.name = "main";
        
//     }
//     //function
//     sayHello(){
//         console.log("Hello World");
//         return 0;
//     }
//      sayHello2(){
//         console.log("Hello World");
//         return 0;
//     }

// }
// //extend
// class Sub extends Main{
//     constructor(){
//         super();

//     }
//     sayHello(){
//         console.log("Hello World from sub "+this.name);
//         return 0;
//     }
//     //object
//     obj = {
//         name: "sub",
//         sayHello: function(){
//             console.log("Hello World from obj "+this.name);
//             return 0;
//         }
//     }


// }


// // const main = new Main().sayHello();
// // console.log(main);

// const sub = new Sub();
// console.log(sub);
// sub.sayHello();
// sub.obj.sayHello();
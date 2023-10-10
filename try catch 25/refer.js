// const hello = () => {
//   //create promise
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Hello World");
//     }, 2000);
//     const error = true;
//     if (error) {
//       reject("Error");
//     }
//   });
// };



// // Async Await
// async function hey() {
//     try{
//         const result = await hello();
//         console.log(result);
//     }catch(error){
//         console.log(error);
//     }
// }
// hey();

// Async Await with fetch
// async function getUsers() {
//     try {
        
//         // await response of the fetch call
//         const response = await fetch("https://jsonplaceholder.typicode.com/users").catch(error => console.log(error));
    
//         // only proceed once its resolved
//         const data = await response.json();
    
//         // only proceed once second promise is resolved
//         return data;
//     } catch (error) {
//         throw new Error("Error");
//     }
// }

// getUsers().then(users => console.log(users));


//promise for fetch
// function getUsers() {
//     //fetch returns a promise
//     return fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then(users => users)
//     .catch(error => console.log(error));
// }

// getUsers().then(users => console.log(users));
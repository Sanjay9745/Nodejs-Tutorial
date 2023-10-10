function hello() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder1.typicode.com/users").then((result)=>{
        resolve(result.json())
    }).catch((error)=>{
        reject(error)
    })
  });
}



async function hey() {
  try {
    const result = await hello();
    console.log(result);
    console.log(1);
  } catch (error) {
    console.log(error);
  }
}
hey()


// async function getUsers() {
//     try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/users");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         throw new Error("Error occured");
//     }
// }

// async function hey() {
//     try {
//         const users = await getUsers();
//         console.log(users);
//     } catch (error) {
//         console.log(error);
//     }
// }
// hey()
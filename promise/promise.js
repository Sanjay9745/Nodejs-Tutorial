//lets take about callback

// function addEvent(callback){
//     setTimeout(function(){
//         var i = 0;
//         while(i < 1000000000){
//             i++;
//         }
//         if(i ==445454){
//             callback('done',null);
//         }else{
//             callback(null,'error');
//         }
//     }, 0);
// }

// addEvent(function(text,err){
//     if(err){
//         return console.log(err);
//     }
//     console.log(text);
// })

//lets take about promise

function addEvent() {
  return new Promise(function (resolve, reject) {
    setTimeout(function(){
        var i = 0;
        while(i < 1000000000){
            i++;
        }
        if(i==1000000000){
            resolve('done');
        }else{
            reject('error');
        }
      
    },0)
  });
}

addEvent()
  .then(function (text) {
    console.log(text);
  })
  .catch(function (err) {
    console.log(err);
  });


  app.get('/api/users', function(req, res){
    fetch('https://jsonplaceholder.typicode.com/users',function (result,error){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: result
        });
    })
  })
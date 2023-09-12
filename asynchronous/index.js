function hello (callback) {
  let world = '101.123.3223.23' ;
    callback(world)
}

hello(function (para) {
    let hi = para + ' Hi'
    console.log(hi)
  })


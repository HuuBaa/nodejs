var p1 = new Promise((resolve,reject) =>{

    console.log("p1")
    resolve("p1数据")
    
})
var p2 = new Promise((resolve,reject) =>{
    console.log("p2")
    resolve(p1);   
})

p2
    .then((data) =>{console.log(data)})
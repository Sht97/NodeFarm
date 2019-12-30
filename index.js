const fs = require('fs');
const http =require('http');

////////////////////////FILES///////////////////
// //BLOCKING: Función syncrona, espera a que se ejecute una línea de código para pasar a la siguiente
// const textInput=fs.readFileSync('./txt/input.txt','utf-8');
// //console.log(textInput);
//
// const textToWrite= `Testing the template strings with var include ${textInput}.
// Create on ${Date.now()}`;
// fs.writeFileSync('./txt/Output1.txt',textToWrite);
// //console.log("Save win");
//
//  //Non blocking, A-syncrona
// fs.readFile('./txt/start.txt','utf-8',(error,data)=>{
//     fs.readFile(`./txt/${data}.txt`,'utf-8',(error,data1)=> {
//         fs.readFile('./txt/append.txt','utf-8',(error,data2)=> {
//             console.log(data1,data2);
//
//             fs.writeFile('./txt/finally.txt',data1+data2 ,'utf-8',err => {
//                 if (err) console.log("Problem saving");
//                 else console.log("Saved successful")
//             })
//         });
//     });
// });
// console.log("hi from out");
////////////////////////SERVER///////////////////
const server = http.createServer(((req, res) => {
    res.end('Hello from server')
}));
server.listen(3000,()=>{
    console.log("listen on port 3000");
});
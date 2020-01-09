const fs = require('fs');
const http = require('http');
const url = require('url');
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
replaceTemplate = (tempCard,el)=> {
    let output=tempCard.replace(/{%productName%}/g,el.productName);
    output=output.replace(/{%image%}/g,el.image);
    output=output.replace(/{%price%}/g,el.price);
    output=output.replace(/{%from%}/g,el.from);
    output=output.replace(/{%nutrients%}/g,el.nutrients);
    output=output.replace(/{%quantity%}/g,el.quantity);
    output=output.replace(/{%description%}/g,el.description);
    output=output.replace(/{%id%}/g,el.id);
    if(!el.organic) output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
};

let  jsonFile=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8'));
const tempOverview=fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8');

const server = http.createServer((req, res) => {
    const path=req.url;

    //Overview page
    if(path === '/overview' ||path === '/'){

        res.writeHead(200,{
            'Content-type':'text/html'
        });
        const cardsHtml=jsonFile.map(el=>replaceTemplate(tempCard,el)).join('');
        const output=tempOverview.replace('{%productCards%}',cardsHtml);
        res.end(output);
    }


    //Product page
    else if(path === '/product'){
        res.end('Hello from product page')
    }


    //Api
    else if(path === '/API'){
        res.writeHead(200,{
            'Content-type':'application/json'
        });
        res.end(jsonFile);
    }

    //Not found
    else {
        res.writeHead(404,{
            'Content-type':'text/html',
            'My-own-header':'Hello-World'
        });
        res.end('<h1>404 page not found</h1>');
    }
});
server.listen(3000,()=>{
    console.log("listen on port 3000");
});
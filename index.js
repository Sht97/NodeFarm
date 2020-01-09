const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate=require('./modules/replaceTemplate');
////////////////////////SERVER///////////////////


let  jsonFile=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8'));
const tempOverview=fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8');

const server = http.createServer((req, res) => {
    const {query , pathname}=url.parse(req.url,true);

    //Overview page
    if(pathname === '/overview' ||pathname === '/'){

        res.writeHead(200,{
            'Content-type':'text/html'
        });
        const cardsHtml=jsonFile.map(el=>replaceTemplate(tempCard,el)).join('');
        const output=tempOverview.replace('{%productCards%}',cardsHtml);
        res.end(output);
    }


    //Product page
    else if(pathname === '/product'){
        const product=jsonFile[query.id];

        const output=replaceTemplate(tempProduct,product);
        res.end(output);
    }

    //Api
    else if(pathname === '/API'){
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
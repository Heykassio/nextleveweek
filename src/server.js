const express = require('express');
const server = express();
const nunjucks = require('nunjucks');

const port = normalizePort(process.env.PORT || '4000');

server.use(express.static('public'));

nunjucks.configure('src/views', {
    express: server,
    noCache: false,
    autoescape: true
});

server.get('/', (req, res)=>{
    return res.render(`index.html`);
});

server.get('/create-point', (req, res)=>{
    return res.render(`create-point.html`);
});

server.get('/search', (req, res)=>{
    return res.render(`search-results.html`);
});

server.listen(port);

function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }
    if(port>=0){
        return port;
    }
    return false;
}

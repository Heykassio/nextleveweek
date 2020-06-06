const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const db = require('./database/db');

const port = normalizePort(process.env.PORT || '4000');

server.use(express.static('public'));
server.use(express.urlencoded({extended: true}));

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

server.post('/savepoint', (req, res)=>{
    console.log(req.body);

    const {image, name, address, address2, state, city, items} = req.body;
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES(?,?,?,?,?,?,?);
    `;

    const values = [image, name, address, address2, state, city, items];

    function afterInsert(error){
        if(error){
            return console.log(error);
        };
        console.log('Cadastrado com sucesso!');
        console.log(this);
        return res.render(`create-point.html`, {saved: true});
    };

    db.run(query, values, afterInsert);
    
});

server.post('/search', (req, res)=>{
    const {search} = req.body;

    if(search == ""){
        return res.render(`search-results.html`, {places: null});
    };

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(error, rows){
        if(error){
            return console.log(error);
        }
        return res.render(`search-results.html`, {places:  rows});
    });
        
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

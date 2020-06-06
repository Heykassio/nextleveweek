const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./src/database/database.db");



module.exports = db;

/*db.serialize(()=>{
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,            
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);          
    `;

    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "Colectoria",
        "Guilherme Gembella, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos eletrônicos, Lâmpadas"
    ];

    function afterInsert (error){
        if(error){
            return console.log(error);
        };
        console.log(`Cadastrado com sucesso!`);
        console.log(this);
    }

    db.run(query, values, afterInsert);

    db.all(`SELECT * FROM places`, function(error, rows){
        if(error){
            return console.log(error);
        };
        console.log('Aqui estão os registros:');
        console.log(rows);
    });

    db.run(`DELETE FROM places WHERE id= ?`, [2], function(error){
        if(error){
            return console.log(error);
        };
        console.log(`Registro deletado com sucesso!`);
    });    

});*/
// db.run(`DELETE FROM places`, function(error){
//     if(error){
//         return console.log(error);
//     };
//     console.log(`Registro deletado com sucesso!`);
// });  
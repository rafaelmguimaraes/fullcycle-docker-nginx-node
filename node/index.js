const express = require('express')
const faker = require('faker');
const connection = require('./connection');

const app = express()
const port = 3000

const randonName = () => faker.name.findName();

app.get('/', async (req,res) => {
    await connection.execute('INSERT INTO people(name) values(?)',
     [randonName()]);
    let page = `
        <h1>Full Cycle Rocks!</h1>
        <h2>Lista de nomes cadastrada no banco de dados:</h2>
        <ul>
    `;
    const [rows] = await connection.execute('SELECT name FROM people');
    rows.forEach(row => {
        page += `<li>${row.name}</li>`;
    });
    page += '</ul>';
    res.send(page);
});

app.listen(port, ()=> {
    console.log('Running on port ', port);
});


const { client } = require('./db');
const { createTables } = require('./db'); 



const init = async()=> {
    console.log('Connecting to database');
    await client.connect();
    console.log('Connected to database');
};


init();
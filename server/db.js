const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_res_db');


const createTables = async()=> {
    const SQL = `
        DROP TABLE IF EXISTS reservation;
        DROP TABLE IF EXISTS customer;
        DROP TABLE IF EXISTS restaurant;
        CREATE TABLE customer(
            id UUID PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );
        CREATE TABLE restaurant(
            id UUID PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );
        CREATE TABLE reservation(
            id UUID PRIMARY KEY,
            date DATE NOT NULL,
            party_count INTEGER NOT NULL,
            restaurant_id UUID REFERENCES restaurant NOT NULL,
            customer_id UUID REFERENCES customer NOT NULL
        );
    `;
    
    await client.query(SQL);
    console.log("Tables created successfully");
};


module.exports = {
  client,
  createTables
}; 
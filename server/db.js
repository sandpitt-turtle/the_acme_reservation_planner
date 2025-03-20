const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_res_db');
const uuid = require('uuid');


const createTables = async()=> {
    const SQL = `
        DROP TABLE IF EXISTS reservations CASCADE;
        DROP TABLE IF EXISTS customers CASCADE;
        DROP TABLE IF EXISTS restaurants CASCADE;

        CREATE TABLE customers(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(50) NOT NULL UNIQUE
        );

        CREATE TABLE restaurants(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(50) NOT NULL UNIQUE
        );

        CREATE TABLE reservations(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            date DATE NOT NULL,
            party_count INTEGER NOT NULL,
            restaurant_id UUID REFERENCES restaurants ON DELETE CASCADE NOT NULL,
            customer_id UUID REFERENCES customers ON DELETE CASCADE NOT NULL
);

    `;
    
    await client.query(SQL);
    
};

const createCustomer = async({name})=> {
    const SQL = `
      INSERT INTO customers(id, name) VALUES($1, $2) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0];
  };
  
  const createRestaurant = async({name})=> {
    const SQL = `
      INSERT INTO restaurants(id, name) 
      VALUES($1, $2) 
      RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0];
  };  

  const fetchCustomers = async()=> {
    const SQL = `
      SELECT *
      FROM customers
    `;
    const response = await client.query(SQL);
    return response.rows;
  };

  const fetchRestaurants = async()=> {
    const SQL = `
      SELECT *
      FROM restaurants
    `;
    const response = await client.query(SQL);
    return response.rows;
  }; 


  const fetchReservations = async() => {
    const SQL = `
        SELECT *
        FROM reservations    
    `;
    const response = await client.query(SQL);
    return response.rows;
  }

  async function createReservation({ customer_id, restaurant_id, date, party_count }) {
    const result = await client.query(
        `INSERT INTO reservations (customer_id, restaurant_id, date, party_count) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [customer_id, restaurant_id, date, party_count]
    );
    return result.rows[0];
}


const destroyReservation = async({ id, customer_id}) => {
    console.log(id, customer_id)
    const SQL = `
        DELETE FROM reservations
        WHERE id = $1 AND customer_id=$2
    `;
    await client.query(SQL, [id, customer_id]);
};



module.exports = {
    client,
    createTables,
    createCustomer,
    createReservation,
    createRestaurant,
    fetchRestaurants,
    fetchCustomers,
    fetchReservations,
    destroyReservation
};
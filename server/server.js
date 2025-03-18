const { client, createTables, createCustomer, createRestaurant, fetchCustomers, fetchRestaurants, createReservation, destroyReservation, fetchReservations } = require('./db');

const express = require('express');
const app = express();
app.use(express.json());



app.get('/api/customers',  async(req, res, next)=> {
    try {
        res.send(await fetchCustomers());
    }
    catch(ex){
        next(ex);
    }
});

app.get('/api/restaurants',  async(req, res, next)=> {
    try {
        res.send(await fetchRestaurants());
    }
    catch(ex){
        next(ex);
    }
});


app.get('/api/reservations',  async(req, res, next)=> {
    try {
        res.send(await fetchReservations());
    }
    catch(ex){
        next(ex);
    }
});


app.post('/api/customers/:id/reservations',  async(req, res, next)=> {
    try {
        res.status(201).send(await createReservation
            ({ 
                restaurant_id: req.body.restaurant_id, 
                date: req.body.date, 
                party_count: req.body.party_count
            }));
    }
    catch(ex){
        next(ex);
    }
});


app.delete('/api/customers/:customer_id/reservations/:id',  async(req, res, next)=> {
    try {
        await destroyReservation({customer_id: req.params.customer_id, id: req.params.id});
        res.sendStatus(204);
    }
    catch(ex){
        next(ex);
    }
});


app.use((err, req, res, next)=> {
    res.status(err.status || 500).send({ error: err.message || err});
});

const init = async () => {
    console.log('Connecting to database');
    await client.connect();
    console.log('Connected to database');

    await createTables();
    console.log('Created tables');

    const [luffy, zoro, sanji, nami, law, shanks, mihawk, hancock, akainu, smoker] = await Promise.all([
        createCustomer({ name: 'Monkey D. Luffy' }),
        createCustomer({ name: 'Roronoa Zoro' }),
        createCustomer({ name: 'Sanji' }),
        createCustomer({ name: 'Nami' }),
        createCustomer({ name: 'Trafalgar Law' }),
        createCustomer({ name: 'Shanks' }),
        createCustomer({ name: 'Dracule Mihawk' }),
        createCustomer({ name: 'Boa Hancock' }),
        createCustomer({ name: 'Sakazuki (Akainu)' }),
        createCustomer({ name: 'Smoker' }),
    ]);

   
    const [baratie, partysBar, marineCafe, wanoSoba, marinefordCafe] = await Promise.all([
        createRestaurant({ name: 'Baratie' }),
        createRestaurant({ name: "Party's Bar" }),
        createRestaurant({ name: 'Marine Cafeteria' }),
        createRestaurant({ name: 'Wano Soba Stand' }),
        createRestaurant({ name: 'Café De Marineford' }),
    ]);

    console.log(await fetchCustomers());
    console.log(await fetchRestaurants());

    const [reservation] = await Promise.all([
        createReservation({ date: '2025-03-20', party_count: 5, restaurant_id: baratie.id, customer_id: luffy.id }),
        createReservation({ date: '2025-04-05', party_count: 2, restaurant_id: wanoSoba.id, customer_id: zoro.id }),
        createReservation({ date: '2025-03-25', party_count: 1, restaurant_id: marineCafe.id, customer_id: akainu.id }),
        createReservation({ date: '2025-03-30', party_count: 3, restaurant_id: partysBar.id, customer_id: shanks.id }),
        createReservation({ date: '2025-04-01', party_count: 2, restaurant_id: marinefordCafe.id, customer_id: hancock.id }),
    ]);

    console.log(await fetchReservations());


    await destroyReservation({ id: reservations[0].id, customer_id: reservations[0].customer_id});
    console.log(await fetchReservations()); 
   

    console.log('Database seeded successfully!');
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

init();

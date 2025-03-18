const { client, createTables, createCustomer, createRestaurant, createReservation } = require('./db');

const init = async () => {
    console.log('Connecting to database');
    await client.connect();
    console.log('Connected to database');

    await createTables();
    console.log('Created tables');

    // // Insert Customers (One Piece characters)
    // const [luffy, zoro, sanji, nami, law, shanks, mihawk, hancock, akainu, smoker] = await Promise.all([
    //     createCustomer({ name: 'Monkey D. Luffy' }),
    //     createCustomer({ name: 'Roronoa Zoro' }),
    //     createCustomer({ name: 'Sanji' }),
    //     createCustomer({ name: 'Nami' }),
    //     createCustomer({ name: 'Trafalgar Law' }),
    //     createCustomer({ name: 'Shanks' }),
    //     createCustomer({ name: 'Dracule Mihawk' }),
    //     createCustomer({ name: 'Boa Hancock' }),
    //     createCustomer({ name: 'Sakazuki (Akainu)' }),
    //     createCustomer({ name: 'Smoker' }),
    // ]);

    // // Insert Restaurants (One Piece locations)
    // const [baratie, partysBar, marineCafe, wanoSoba, marinefordCafe] = await Promise.all([
    //     createRestaurant({ name: 'Baratie' }),
    //     createRestaurant({ name: "Party's Bar" }),
    //     createRestaurant({ name: 'Marine Cafeteria' }),
    //     createRestaurant({ name: 'Wano Soba Stand' }),
    //     createRestaurant({ name: 'Café De Marineford' }),
    // ]);

    // // Insert Reservations
    // await Promise.all([
    //     createReservation({ date: '2025-03-20', party_count: 5, restaurant_id: baratie.id, customer_id: luffy.id }),
    //     createReservation({ date: '2025-04-05', party_count: 2, restaurant_id: wanoSoba.id, customer_id: zoro.id }),
    //     createReservation({ date: '2025-03-25', party_count: 1, restaurant_id: marineCafe.id, customer_id: akainu.id }),
    //     createReservation({ date: '2025-03-30', party_count: 3, restaurant_id: partysBar.id, customer_id: shanks.id }),
    //     createReservation({ date: '2025-04-01', party_count: 2, restaurant_id: marinefordCafe.id, customer_id: hancock.id }),
    // ]);

    console.log('Database seeded successfully!');
};

init();

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker) => {
  return {
    name: faker.username(),
    email: faker.email(),
    password: faker.password(),
  };
});

Factory.blueprint('App/Models/Account', (faker) => {
  return {
    name: faker.sentence({ words: 2 }),
    color: faker.random.hexaDecimal(),
  };
});

Factory.blueprint('App/Models/AssignmentDate', (faker) => {
  return {
    month: faker.date('M'),
    year: faker.date('Y'),
    balance: faker.floating({ min: 0, max: 3000 }),
  };
});

Factory.blueprint('App/Models/AccountValue', (faker) => {
  return {
    total: faker.floating({ min: 0, max: 300 }),
    status: faker.randomly(['C', 'D']),
  };
});

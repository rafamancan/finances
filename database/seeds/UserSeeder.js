/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database');
const Hash = use('Hash');

class UserSeeder {
  async run() {
    await Database.table('users').insert([
      {
        name: 'Admin',
        email: 'admin@17bits.com.br',
        password: await Hash.make('123123'),
      },
    ]);
  }
}

module.exports = UserSeeder;

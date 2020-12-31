/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AssignmentDateSchema extends Schema {
  up() {
    this.create('assignment_dates', (table) => {
      table.increments();
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts');
      table.string('month', 2).notNullable();
      table.string('year', 4).notNullable();
      table.float('balance').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('assignment_dates');
  }
}

module.exports = AssignmentDateSchema;

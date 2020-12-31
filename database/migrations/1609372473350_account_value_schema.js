"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AccountValuesSchema extends Schema {
  up() {
    this.create("account_values", (table) => {
      table.increments();
      table
        .integer("assignment_date_id")
        .unsigned()
        .references("id")
        .inTable("assignment_dates");
      table.enu("type", ["C", "D"]).notNullable();
      table.float("value").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("account_values");
  }
}

module.exports = AccountValuesSchema;

"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Account extends Model {
  assignmentDates() {
    return this.hasMany("App/Models/AssignmentDate");
  }

  users() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Account;

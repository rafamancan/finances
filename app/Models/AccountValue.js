/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class AccountValue extends Model {
  users() {
    return this.belongsTo('App/Models/AssignmentDate');
  }
}

module.exports = AccountValue;

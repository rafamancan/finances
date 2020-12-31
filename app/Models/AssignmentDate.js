'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AssignmentDate extends Model {
accounts(){
return this.belongsTo('App/Models/Account');

}
}

module.exports = AssignmentDate

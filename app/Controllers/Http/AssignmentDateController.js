const Account = use('App/Models/Account');
const AssignmentDate = use('App/Models/AssignmentDate');

class AssignmentDateController {
  async store({ response, params, request }) {
    const { account_id } = params;
    await Account.firstOrFail('id', account_id);

    const data = request.only(['month', 'year', 'balance']);

    const assignmentDate = await AssignmentDate.create({ ...data, account_id });

    return response.created(assignmentDate);
  }

  async show({ params }) {
    const assignmentDate = AssignmentDate.query()
      .where('account_id', params.account_id)
      .with('account')
      .fetch();

    return assignmentDate;
  }
}

module.exports = AssignmentDateController;

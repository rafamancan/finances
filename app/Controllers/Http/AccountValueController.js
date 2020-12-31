"use strict";

const AssignmentDate = use("App/Models/AssignmentDate");
const AccountValue = use("App/Models/AccountValue");

class AccountValueController {
  async store({ response, params, request }) {
    const { assignment_date_id } = params;
    await AssignmentDate.firstOrFail("id", assignment_date_id);

    const data = request.only(["value", "type"]);

    const assignmentDate = await AccountValue.create({
      ...data,
      assignment_date_id,
    });

    return response.created(assignmentDate);
  }

  async show({ params }) {
    const assignmentDate = AccountValue.query()
      .where("assignment_date_id", params.assignment_date_id)
      .with("account")
      .fetch();

    return assignmentDate;
  }
}

module.exports = AccountValueController;

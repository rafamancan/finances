class CreateAssignmentDate {
  get rules() {
    return {
      account_id: 'required|integer',
      month: 'required|string[2]',
      year: 'required|string[4]',
      balance: 'required|number',
    };
  }

  get messages() {
    return {
      required: '{{ field }} is required',
      string: '{{ field }} is not a valid string',
      integer: '{{ field }} is not a valid Account',
      balance: '{{ field }} is not a valid Balance',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = CreateAssignmentDate;

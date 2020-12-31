"use strict";

class CreateAccountValue {
  get rules() {
    return {
      assignment_date_id: "required|integer",
      value: "required|number",
      type: "required|in:C,D",
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required",
      string: "{{ field }} is not a valid string",
      integer: "{{ field }} is not a valid Assignment Date",
      in: "{{ field }} is not a valid Type",
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = CreateAccountValue;

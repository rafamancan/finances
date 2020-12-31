"use strict";

class UpdateAccountValue {
  get rules() {
    return {
      value: "required|number",
      type: "required|in:C,D",
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required",
      string: "{{ field }} is not a valid string",
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

module.exports = UpdateAccountValue;

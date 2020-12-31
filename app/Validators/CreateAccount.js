"use strict";

class CreateAccount {
  get rules() {
    return {
      user_id: "required|integer",
      name: "required|string",
      color: "string",
    };
  }

  get messages() {
    return {
      integer: "{{ field }} is not a valid User",
      required: "{{ field }} is required",
      string: "{{ field }} is not a valid string",
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = CreateAccount;

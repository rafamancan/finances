"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ response, request }) {
    const user = await User.create({
      ...request.only(["name", "email", "password"]),
    });

    return response.created(user);
  }

  async update({ response, request }) {
    const { email, name, password } = request.all();
    const user = await User.findBy("email", email);

    if (!user) {
      return response.status(400).send([{ error: "User not found" }]);
    }

    user.name = name;
    user.email = email;

    if (password) {
      user.password = password;
    }

    await user.save();
    return response.status(201).send(user);
  }
}

module.exports = UserController;

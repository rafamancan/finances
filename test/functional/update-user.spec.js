"use strict";

const Factory = use("Factory");
const { test, trait } = use("Test/Suite")("Update User");

trait("Test/ApiClient");
trait("Auth/Client");

test("can update user with valid data", async ({ assert, client }) => {
  const user = await Factory.model("App/Models/User").create();

  const data = {
    email: user.email,
    name: "rafael teste",
    password: "newpass",
  };

  const response = await client
    .put("/api/v1/users")
    .loginVia(user, "user")
    .send(data)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: data.name,
    email: data.email,
  });
});

test("can update user without change password", async ({ assert, client }) => {
  const user = await Factory.model("App/Models/User").create();

  const data = {
    email: user.email,
    name: "rafael teste",
  };

  const response = await client
    .put("/api/v1/users")
    .loginVia(user, "user")
    .send(data)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: data.name,
    email: data.email,
  });
});

test("can't update user without authenticated", async ({ assert, client }) => {
  const user = await Factory.model("App/Models/User").create();

  const data = {
    email: user.email,
    name: "rafael teste",
    password: "newpass",
  };

  const response = await client.put("/api/v1/users").send(data).end();

  response.assertStatus(401);
});

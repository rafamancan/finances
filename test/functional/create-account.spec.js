"use strict";

const Factory = use("Factory");
const { test, trait } = use("Test/Suite")("Create Users Account");

trait("Test/ApiClient");
trait("Auth/Client");

const validDate = {
  name: "Conta 1",
  color: "#F3B3E0",
};

test("can create account with valid data", async ({ assert, client }) => {
  const account = await Factory.model("App/Models/Account").create();

  const response = await client
    .post(`/api/v1/accounts/${account.id}`)
    .loginVia(user, "user")
    .send(validDate)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: validDate.name,
    color: validDate.color,
  });
});

test("can't create account with empty name", async ({ assert, client }) => {
  const account = await Factory.model("App/Models/Account").create();

  const data = { ...validDate, name: "" };

  const response = await client
    .post(`/api/v1/accounts/${account.id}`)
    .loginVia(user, "user")
    .send(validDate)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "name is required",
      field: "name",
      validation: "required",
    },
  ]);
});

test("can't create account if not authenticated", async ({
  assert,
  client,
}) => {
  const account = Factory.model("App/Models/Account").create();

  const response = await client
    .post(`/api/v1/accounts/${account.id}`)
    .send(validDate)
    .end();

  response.assertStatus(401);
});

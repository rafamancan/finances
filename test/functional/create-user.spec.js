const { test, trait } = use('Test/Suite')('Create User');

trait('Test/ApiClient');
trait('Auth/Client');

const validData = {
  name: 'Jane Doe',
  email: 'jane@doe.com',
  password: '123123',
};

test('can create user with valid data', async ({ client }) => {
  const response = await client.post('/api/v1/users').send(validData).end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: validData.name,
    email: validData.email,
  });
});

test("can't create user with invalid email", async ({ client }) => {
  const data = { ...validData, email: 'jane.doe' };

  const response = await client.post('/api/v1/users').send(data).end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'email validation failed on email',
      field: 'email',
      validation: 'email',
    },
  ]);
});

test("can't create user when email already in use", async ({ client }) => {
  const response = await client.post('/api/v1/users').send(validData).end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'unique validation failed on email',
      validation: 'unique',
    },
  ]);
});

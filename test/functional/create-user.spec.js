const { test, trait } = use('Test/Suite')('Create User');

trait('Test/ApiClient');
trait('Auth/Client');

test('can create user with valid data', async ({ client }) => {
  const data = {
    name: 'Rafael Mancan',
    email: 'rafael.mancan@gmail.com',
    password: '12345',
  };

  const response = await client.post('/api/v1/users').send(data).end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: data.name,
    email: data.email,
  });
});

test("can't create user with invalid email", async ({ client }) => {
  const data = {
    name: 'Rafael Mancan',
    email: 'rafael.mancan',
    password: '12345',
  };

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
  const data = {
    name: 'Rafael Mancan',
    email: 'rafael.mancan@gmail.com',
    password: '12345',
  };

  const response = await client.post('/api/v1/users').send(data).end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'unique validation failed on email',
      validation: 'unique',
    },
  ]);
});

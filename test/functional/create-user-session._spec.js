const { test, trait } = use('Test/Suite')('Create User');

trait('Test/ApiClient');
trait('Auth/Client');

test('can authenticate with valid user credentials', async ({ client }) => {
  const data = {
    name: 'Rafael Mancan',
    email: 'rafael.mancan@hotmail.com',
    password: '12345',
  };

  const response = await client.post('/api/v1/users').send(data).end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: data.name,
    email: data.email,
  });

  const authenticated = await client
    .post('/api/v1/users/sessions')
    .send(data)
    .end();

  authenticated.assertStatus(200);
});

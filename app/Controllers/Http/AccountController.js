const User = use('App/Models/User');
const Account = use('App/Models/Account');

class AccountController {
  async store({ response, params, request }) {
    const { user_id } = params;
    await User.firstOrFail('id', user_id);

    const data = request.only(['name', 'color']);

    const account = await Account.create({ ...data, user_id });

    return response.created(account);
  }

  async show({ params }) {
    const account = Account.query()
      .where('user_id', params.user_id)
      .with('user')
      .fetch();

    return account;
  }
}

module.exports = AccountController;

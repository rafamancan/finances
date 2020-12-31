/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');

Route.group(() => {
  // user
  Route.post('/', 'UserController.store').validator('CreateUser');

  Route.put('/', 'UserController.update')
    .validator('UpdateUser')
    .middleware(['auth:jwt']);

  // sessions
  Route.post('/sessions', 'SessionController.create').validator(
    'CreateUserSession',
  );

  // accounts
  Route.get('/accounts', 'AccountController.show').middleware(['auth:jwt']);

  Route.put('/accounts/:account_id', 'AccountController.update')
    .validator('UpdateAccount')
    .middleware(['auth:jwt']);

  Route.delete('/accounts/:account_id', 'AccountController.delete')
    .validator('DeleteAccount')
    .middleware(['auth:jwt']);

  // assignment dates
  Route.get('/assignment_dates', 'AssignmentDateController.show').middleware([
    'auth:jwt',
  ]);

  Route.put(
    '/assignment_dates/:assignment_date_id',
    'AssignmentDateController.update',
  )
    .validator('UpdateAssignmentDate')
    .middleware(['auth:jwt']);

  Route.delete(
    '/assignment_dates/:assignment_date_id',
    'AssignmentDateController.delete',
  )
    .validator('DeleteAssignmentDate')
    .middleware(['auth:jwt']);

  // account values
  Route.get(
    '/:assignment_date_id/account_values',
    'AccountValueController.show',
  ).middleware(['auth:jwt']);

  Route.put(
    '/:assignment_date_id/account_values/:account_values_id',
    'AccountValueController.update',
  )
    .validator('UpdateAccountValue')
    .middleware(['auth:jwt']);

  Route.delete(
    '/:assignment_date_id/account_values/:account_values_id',
    'AccountValueController.delete',
  )
    .validator('DeleteAccountValue')
    .middleware(['auth:jwt']);
}).prefix('/api/v1/users');

const { Router } = require('express');
const authMiddleware = require('./app/middlewares/auth');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const routes = new Router();

routes.post('/signup', UserController.create);
routes.get('/user', authMiddleware, UserController.read);

routes.post('/signin', SessionController.create);

module.exports = routes;

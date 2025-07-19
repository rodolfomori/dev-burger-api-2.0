import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';
import CategoryController from './app/controllers/CategoryController';
import UserController from './app/controllers/UserController';
import OrderController from './app/controllers/OrderController';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController';

import authMiddleware from './app/middlewares/auth';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/users', UserController.store); // Cadastro

routes.post('/sessions', SessionController.store); // Login

routes.use(authMiddleware); // será chamado por todas as rotas ABAIXO

routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', upload.single('file'), ProductController.update);

routes.post('/categories', upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);

routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.get('/orders', OrderController.index);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;

import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
const upload = multer(multerConfig);


// instanciando, minusculo
const routes = express.Router();
const pointscontroller = new PointsController;
const itemscontroller = new ItemsController;

// formato padrão da comunidade para os métodos:
// index, show, create, update, delete

routes.get('/items', itemscontroller.index);
// routes.post('/points', pointscontroller.create);
routes.get('/points', pointscontroller.index);
routes.get('/points/:id', pointscontroller.show);

routes.post(
    '/points',
    upload.single('image'),
    celebrate(
      {
        body: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().required().email(),
          whatsapp: Joi.number().required(),
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
          city: Joi.string().required(),
          uf: Joi.string().required(),
          items: Joi.string().required(),
        }),
      },
      {
        abortEarly: false,
      }
    ),
    pointscontroller.create
  );



export default routes;
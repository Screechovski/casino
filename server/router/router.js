import {Router} from 'express';
import {ipMiddleware} from '../middleware/ipMiddleware';
import {body} from 'express-validator';
import {registerController} from '../controllers/registerController';
import {checkController} from '../controllers/checkController';
import {betsController} from '../controllers/betsController';
import {validationRules} from '../../config';
import {userController} from '../controllers/userController';
import {messagesController} from '../controllers/messagesController';

export const router = new Router();

router.get('/check', [ipMiddleware], checkController);
router.post(
  '/register',
  [
    ipMiddleware,
    body('name', 'Поле "name" не должно быть пустым').notEmpty(),
    body('name', 'Поле "name" должно состоять из 4-20 символов').isLength(
      validationRules.name
    )
  ],
  registerController
);
router.post('/bets', betsController);
router.post(
  '/user',
  [body('id', 'Поле "id" не должно быть пустым').notEmpty()],
  userController
);
router.get('/messages', messagesController);

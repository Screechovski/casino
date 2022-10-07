import {validationResult} from 'express-validator';
import {HTTP_CODES} from '../assets/helper';
import {Promos} from '../db/promos';
import {Users} from '../db/users';
import {promoValue} from '../../config';

export const promosController = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.status(HTTP_CODES.BAD_REQUEST_400).json({validationErrors});
    return;
  }

  try {
    const promo = req.body.promo.trim();
    const id = req.body.id;
    const has = await Promos.has(promo);

    if (has) {
      const user = await Users.getAll((u) => u.id === id);
      await Users.update(id, {balance: user.balance + promoValue});
      await Promos.remove(promo);
    }

    res.status(HTTP_CODES.OK_200).json({has});
  } catch (error) {
    console.log(error);
    res.status(HTTP_CODES.SERVER_ERROR_500).json({error});
  }
};

import {validationResult} from 'express-validator';
import {HTTP_CODES} from '../assets/helper';
import {Users} from '../db/users';

export const userController = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.status(HTTP_CODES.BAD_REQUEST_400).json({validationErrors});
    return;
  }

  try {
    const id = parseInt(req.body.id);
    const user = await Users.getAll((i) => i.id === id);

    delete user.ip;

    res.status(HTTP_CODES.OK_200).json({user});
  } catch (error) {
    console.log(error);
    res.status(HTTP_CODES.SERVER_ERROR_500).json({error});
  }
};

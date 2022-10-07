import {Users} from '../db/users';
import {validationResult} from 'express-validator';
import {HTTP_CODES} from '../assets/helper';

export const registerController = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.status(HTTP_CODES.BAD_REQUEST_400).json({validationErrors});
    return;
  }

  try {
    const ip = req._ip;
    const name = req.body.name.trim();
    await Users.set(ip, name);
    const user = await Users.getAll((u) => u.ip === ip);

    res.status(HTTP_CODES.OK_200).json({user});
  } catch (error) {
    console.log(error);
    res.status(HTTP_CODES.SERVER_ERROR_500).json({error});
  }
};

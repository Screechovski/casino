import {Users} from '../db/users';
import {HTTP_CODES} from '../assets/helper';

export const checkController = async (req, res) => {
  try {
    const ip = req._ip;
    const user = await Users.getAll((u) => u.ip === ip);
    const id = user ? user.id : null;

    res.status(HTTP_CODES.OK_200).json({id});
  } catch (error) {
    console.log(error);
    res.status(HTTP_CODES.SERVER_ERROR_500).json({error});
  }
};

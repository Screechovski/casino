import {Messages} from '../db/messages';
import {HTTP_CODES} from '../assets/helper';

export const messagesController = async (req, res) => {
  try {
    const messages = await Messages.get();

    res.status(HTTP_CODES.OK_200).json({messages});
  } catch (error) {
    console.log(error);
    res.status(HTTP_CODES.SERVER_ERROR_500).json({error});
  }
};

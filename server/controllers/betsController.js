import {Bets} from '../db/bets';
import {HTTP_CODES} from '../assets/helper';

export const betsController = async (req, res) => {
  try {
    const bets = await Bets.get();

    res.status(HTTP_CODES.OK_200).json({bets});
  } catch (error) {
    console.log(error);
    res.status(HTTP_CODES.SERVER_ERROR_500).json({error});
  }
};

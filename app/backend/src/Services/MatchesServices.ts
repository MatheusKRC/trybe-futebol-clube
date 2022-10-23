import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

class MatchesServices {
  public getAllMatches = async () => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    if (matches) {
      return { status: null, message: matches };
    }
    return { status: 400, message: 'Matches Not Found' };
  };

  public getMatchesProgress = async (inProgress: boolean) => {
    const matches = await Matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    if (matches) {
      return { status: null, message: matches };
    }
    return { status: 400, message: 'Matches Not Found' };
  };
}

export default MatchesServices;

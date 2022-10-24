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

  public postMatch = async (body: Matches) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    const inProgress = true;
    if (homeTeam === awayTeam) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    const getHomeTeam = await Teams.findByPk(homeTeam);
    const getAwayTeam = await Teams.findByPk(awayTeam);
    if (!getAwayTeam || !getHomeTeam) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    const insertMatch = await Matches.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
    if (insertMatch) {
      return { status: null, message: insertMatch };
    }
    return { status: 400, message: 'Match Not Inserted' };
  };

  public finishMatch = async (id: string) => {
    const inProgress = false;
    const [updateProgress] = await Matches.update(
      { inProgress },
      { where: { id } },
    );
    if (updateProgress) {
      return { status: null, message: 'Finished' };
    }
    return { status: 400, message: 'Match Not Finished' };
  };
}

export default MatchesServices;

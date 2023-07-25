import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

class LeaderboardServices {
  public getTeamsNames = async () => {
    const teams = await Teams.findAll();
    return teams;
  };

  public getMatchesFinished = async () => {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    return matches;
  };

  private totalPointsAway = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    let teamPoints = 0;
    const teamFilter = matches.filter((name) => name.awayTeam === teamId);
    teamFilter.forEach((points) => {
      if (points.awayTeamGoals > points.homeTeamGoals) {
        teamPoints += 3;
      }
      if (points.awayTeamGoals === points.homeTeamGoals) {
        teamPoints += 1;
      }
      if (points.awayTeamGoals < points.homeTeamGoals) {
        teamPoints += 0;
      }
    });
    return teamPoints;
  };

  private totalPointsHome = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    let teamPoints = 0;
    const teamFilter = matches.filter((name) => name.homeTeam === teamId);
    teamFilter.forEach((points) => {
      if (points.homeTeamGoals > points.awayTeamGoals) {
        teamPoints += 3;
      }
      if (points.homeTeamGoals === points.awayTeamGoals) {
        teamPoints += 1;
      }
      if (points.homeTeamGoals < points.awayTeamGoals) {
        teamPoints += 0;
      }
    });
    return teamPoints;
  };

  private totalGames = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    const teamFilterAway = matches.filter((name) => name.awayTeam === teamId);
    const teamFilterHome = matches.filter((name) => name.homeTeam === teamId);
    const totalGames = teamFilterAway.length + teamFilterHome.length;
    return totalGames;
  };

  private totalVictories = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    let count = 0;
    const teamFilterAway = matches.filter((name) => name.awayTeam === teamId);
    const teamFilterHome = matches.filter((name) => name.homeTeam === teamId);
    teamFilterAway.forEach((victories) => {
      if (victories.awayTeamGoals > victories.homeTeamGoals) {
        count += 1;
      }
    });
    teamFilterHome.forEach((victories) => {
      if (victories.homeTeamGoals > victories.awayTeamGoals) {
        count += 1;
      }
    });
    return count;
  };

  private totalDefeats = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    let count = 0;
    const teamFilterAway = matches.filter((name) => name.awayTeam === teamId);
    const teamFilterHome = matches.filter((name) => name.homeTeam === teamId);
    teamFilterAway.forEach((victories) => {
      if (victories.awayTeamGoals < victories.homeTeamGoals) {
        count += 1;
      }
    });
    teamFilterHome.forEach((victories) => {
      if (victories.homeTeamGoals < victories.awayTeamGoals) {
        count += 1;
      }
    });
    return count;
  };

  private totalDraws = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    let count = 0;
    const teamFilterAway = matches.filter((name) => name.awayTeam === teamId);
    const teamFilterHome = matches.filter((name) => name.homeTeam === teamId);
    teamFilterAway.forEach((victories) => {
      if (victories.awayTeamGoals === victories.homeTeamGoals) {
        count += 1;
      }
    });
    teamFilterHome.forEach((victories) => {
      if (victories.homeTeamGoals === victories.awayTeamGoals) {
        count += 1;
      }
    });
    return count;
  };

  private goalsFavor = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    let goals = 0;
    const teamFilterAway = matches.filter((name) => name.awayTeam === teamId);
    const teamFilterHome = matches.filter((name) => name.homeTeam === teamId);
    teamFilterAway.forEach((points) => {
      goals += points.awayTeamGoals;
    });
    teamFilterHome.forEach((points) => {
      goals += points.homeTeamGoals;
    });
    return goals;
  };

  private goalsOwn = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    let goals = 0;
    const teamFilterAway = matches.filter((name) => name.awayTeam === teamId);
    const teamFilterHome = matches.filter((name) => name.homeTeam === teamId);
    teamFilterAway.forEach((points) => {
      goals += points.homeTeamGoals;
    });
    teamFilterHome.forEach((points) => {
      goals += points.awayTeamGoals;
    });
    return goals;
  };

  private goalsBalanceAway = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    let GP = 0;
    let GC = 0;
    const teamFilter = matches.filter((name) => name.awayTeam === teamId);
    teamFilter.forEach((points): number => {
      GP += points.awayTeamGoals;
      return GP as number;
    });
    teamFilter.forEach((points): number => {
      GC += points.homeTeamGoals;
      return GC as number;
    });
    const goalsBalance = Number(GP) - Number(GC);
    return goalsBalance;
  };

  private goalsBalanceHome = async (teamId: number) => {
    const matches = await this.getMatchesFinished();
    let GP = 0;
    let GC = 0;
    const teamFilter = matches.filter((name) => name.homeTeam === teamId);
    teamFilter.forEach((points): number => {
      GP += points.homeTeamGoals;
      return GP as number;
    });
    teamFilter.forEach((points): number => {
      GC += points.awayTeamGoals;
      return GC as number;
    });
    const goalsBalance = Number(GP) - Number(GC);
    return goalsBalance;
  };

  private efficiency = async (teamId: number) => {
    const totalGames = await this.totalGames(teamId);
    const totalPointsAway = await this.totalPointsAway(teamId);
    const totalPointsHome = await this.totalPointsHome(teamId);
    const totalPoints = totalPointsHome + totalPointsAway;
    const efficiency = (Number(totalPoints) / (Number(totalGames) * 3)) * 100;
    return efficiency.toFixed(2);
  };

  public finalResult = async () => {
    const teamsNames = await this.getTeamsNames();
    const leaderboard = Promise.all(teamsNames.map(async (teams) => {
      const final = {
        name: teams.teamName,
        totalPoints: await this.totalPointsAway(teams.id) + await this.totalPointsHome(teams.id),
        totalGames: await this.totalGames(teams.id),
        totalVictories: await this.totalVictories(teams.id),
        totalDraws: await this.totalDraws(teams.id),
        totalLosses: await this.totalDefeats(teams.id),
        goalsFavor: await this.goalsFavor(teams.id),
        goalsOwn: await this.goalsOwn(teams.id),
        goalsBalance: await this.goalsBalanceAway(teams.id) + await this.goalsBalanceHome(teams.id),
        efficiency: await this.efficiency(teams.id),
      };
      return final;
    }));

    return leaderboard;
  };

  public leaderboardSort = async () => {
    const finalResult = await this.finalResult();

    const leaderboardSort = finalResult.sort((a, b) =>
      Number(b.totalPoints) - Number(a.totalPoints)
      || Number(b.totalVictories) - Number(a.totalVictories)
      || Number(b.goalsBalance) - Number(a.goalsBalance)
      || Number(b.goalsFavor) - Number(a.goalsFavor)
      || Number(a.goalsOwn) - Number(b.goalsOwn));
    return leaderboardSort;
  };
}

export default LeaderboardServices;

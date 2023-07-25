import { Request, Response } from 'express';
import LeaderboardServicesAway from '../Services/LeaderboardServicesAway';
import LeaderboardServices from '../Services/LeaderboardServices';

class LeaderboardControllers {
  private service: LeaderboardServices;
  private serviceAway: LeaderboardServicesAway;

  constructor() {
    this.service = new LeaderboardServices();
    this.serviceAway = new LeaderboardServicesAway();
  }

  public getLeaderboards = async (req: Request, res: Response) => {
    const leaderboard = await this.service.leaderboardSort();
    return res.status(200).json(leaderboard);
  };

  public getLeaderboardsAway = async (req: Request, res: Response) => {
    const leaderboardAway = await this.serviceAway.leaderboardSortAway();
    return res.status(200).json(leaderboardAway);
  };
}

export default LeaderboardControllers;

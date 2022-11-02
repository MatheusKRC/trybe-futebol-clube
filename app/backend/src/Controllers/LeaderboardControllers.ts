import { Request, Response } from 'express';
import LeaderboardServices from '../Services/LeaderboardServices';

class LeaderboardControllers {
  private service: LeaderboardServices;

  constructor() {
    this.service = new LeaderboardServices();
  }

  public getLeaderboards = async (req: Request, res: Response) => {
    const leaderboard = await this.service.leaderboardSort();
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardControllers;

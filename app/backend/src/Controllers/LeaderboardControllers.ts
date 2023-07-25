import { Request, Response } from 'express';
import LeaderboardServices from '../Services/LeaderboardServices';
import LeaderboardServicesAway from '../Services/LeaderboardServicesAway';
import LeaderboardServicesHome from '../Services/LeaderboardServicesHome';

class LeaderboardControllers {
  private serviceHome: LeaderboardServicesHome;
  private serviceAway: LeaderboardServicesAway;
  private service: LeaderboardServices;

  constructor() {
    this.serviceHome = new LeaderboardServicesHome();
    this.serviceAway = new LeaderboardServicesAway();
    this.service = new LeaderboardServices();
  }

  public getLeaderboardsHome = async (req: Request, res: Response) => {
    const leaderboardHome = await this.serviceHome.leaderboardSortHome();
    return res.status(200).json(leaderboardHome);
  };

  public getLeaderboardsAway = async (req: Request, res: Response) => {
    const leaderboardAway = await this.serviceAway.leaderboardSortAway();
    return res.status(200).json(leaderboardAway);
  };

  public getLeaderboards = async (req: Request, res: Response) => {
    const leaderboard = await this.service.leaderboardSort();
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardControllers;

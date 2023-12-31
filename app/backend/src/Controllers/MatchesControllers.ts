import { Request, Response } from 'express';
import MatchesServices from '../Services/MatchesServices';

class MatchesControllers {
  private service: MatchesServices;

  constructor() {
    this.service = new MatchesServices();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const { message } = await this.service.getAllMatches();
    return res.status(200).json(message);
  };

  public getMatchesProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (!inProgress) { this.getAllMatches(req, res); }
    if (inProgress === 'true') {
      const { status, message } = await this.service.getMatchesProgress(true);
      if (status) {
        return res.status(status).json({ message });
      }
      return res.status(200).json(message);
    }
    if (inProgress === 'false') {
      const { status, message } = await this.service.getMatchesProgress(false);
      if (status) {
        return res.status(status).json({ message });
      }
      return res.status(200).json(message);
    }
  };

  public postMatch = async (req: Request, res: Response) => {
    const { body } = req;
    const { status, message } = await this.service.postMatch(body);
    if (status) {
      return res.status(status).json({ message });
    }
    return res.status(201).json(message);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await this.service.finishMatch(id);
    if (status) {
      return res.status(status).json({ message });
    }
    return res.status(200).json({ message });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const { status, message } = await this.service.updateMatch(body, id);
    if (status) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(message);
  };
}

export default MatchesControllers;

import { Request, Response } from 'express';
// import Service from '../Interfaces/Service';
import TeamsServices from '../Services/TeamsServices';

class TeamsControllers {
  private service: TeamsServices;

  constructor() {
    this.service = new TeamsServices();
  }

  public getAll = async (req: Request, res: Response) => {
    const { message } = await this.service.getAll();
    return res.status(200).json(message);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await this.service.getTeamById(id);
    if (status) {
      return res.status(status).json({ message });
    }
    return res.status(200).json(message);
  };
}

export default TeamsControllers;

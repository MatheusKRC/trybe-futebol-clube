import { Request, Response } from 'express';
import LoginService from '../Services/LoginService';

class LoginControllers {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { body } = req;
    const { status, message } = await this.service.login(body);
    if (status) {
      return res.status(status).json({ message });
    }
    return res.status(200).json({ token: message });
  };
}

export default LoginControllers;

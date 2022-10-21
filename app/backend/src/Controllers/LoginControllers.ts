import { Request, Response } from 'express';
import LoginService from '../Services/LoginService';

class LoginControllers {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { body } = req;
    const { type, message } = await this.service.login(body);
    if (type) {
      return res.status(400).json({ message: 'Login Failed' });
    }
    return res.status(200).json({ token: message });
  };
}

export default LoginControllers;

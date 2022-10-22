import { Request, Response } from 'express';
import tokenReturn from '../Interfaces/tokenReturn';
import JWT from '../Utils/JWT';
import LoginService from '../Services/LoginService';

class LoginControllers {
  private service: LoginService;
  private jwt: JWT;

  constructor() {
    this.service = new LoginService();
    this.jwt = new JWT();
  }

  public login = async (req: Request, res: Response) => {
    const { body } = req;
    const { status, message } = await this.service.login(body);
    if (status) {
      return res.status(status).json({ message });
    }
    return res.status(200).json({ token: message });
  };

  public getRole = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { type, message } = this.jwt.authenticateToken(token as string);
    if (type) {
      return res.status(400).json({ message });
    }
    const { email } = message as tokenReturn;
    const getRole = await this.service.getRole(email);
    return res.status(200).json({ role: getRole.message });
  };
}

export default LoginControllers;

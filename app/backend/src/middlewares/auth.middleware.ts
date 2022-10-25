import { Request, Response, NextFunction } from 'express';
import JWT from '../Utils/JWT';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  const jwt = new JWT();
  const user = jwt.authenticateToken(token as string);
  if (user.type) {
    return res.status(401).json({ message: user.message });
  }
  req.body.user = user;
  return next();
};

export default authMiddleware;

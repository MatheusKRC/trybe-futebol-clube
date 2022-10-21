import { sign, verify } from 'jsonwebtoken';
import JwtConfig from '../Interfaces/JwtConfig';

class JWT {
  public id: number;
  public email: string;

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }

  public generateToken = () => {
    const payload = {
      id: this.id,
      email: this.email,
    };

    const jwtConfig: JwtConfig = {
      expiresIn: '15m',
      algorithm: 'HS256',
    };

    const JWT_SECRET = process.env.JWT_SECRET || 'kyracraft12';
    const token = sign(payload, JWT_SECRET, jwtConfig as any);
    return token;
  };

  authenticateToken = (token: string) => {
    if (!token) {
      return { type: 'Missing Token', message: 'Token not found' };
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET || 'kyracraft12';
      const validateToken = verify(token, JWT_SECRET);
      return { type: null, message: validateToken };
    } catch (error) {
      console.log(error);
      return { type: 'jwt malformed', message: 'Expired or invalid token' };
    }
  };
}

export default JWT;

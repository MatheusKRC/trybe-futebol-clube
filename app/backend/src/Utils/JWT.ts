import { sign, verify } from 'jsonwebtoken';
import tokenReturn from '../Interfaces/tokenReturn';
import JwtConfig from '../Interfaces/JwtConfig';

class JWT {
  public generateToken = (id: number, email: string) => {
    const payload = {
      id,
      email,
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
      return { type: null, message: validateToken as tokenReturn };
    } catch (error) {
      console.log(error);
      return { type: 'jwt malformed', message: 'Expired or invalid token' };
    }
  };
}

export default JWT;

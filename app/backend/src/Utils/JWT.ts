import { sign, verify } from 'jsonwebtoken';
import tokenReturn from '../Interfaces/tokenReturn';
import JwtConfig from '../Interfaces/JwtConfig';

const JWT_SECRET = process.env.JWT_SECRET || 'kyracraft12';

class JWT {
  public generateToken = (id: number, email: string) => {
    const payload = {
      id,
      email,
    };

    const jwtConfig: JwtConfig = {
      expiresIn: '2d',
      algorithm: 'HS256',
    };

    const token = sign(payload, JWT_SECRET, jwtConfig as any);
    return token;
  };

  authenticateToken = (token: string) => {
    if (!token) {
      return { type: 'Missing Token', message: 'Token not found' };
    }

    try {
      const validateToken = verify(token, JWT_SECRET);
      return { type: null, message: validateToken as tokenReturn };
    } catch (error) {
      console.log(error);
      return { type: 'jwt malformed', message: 'Token must be a valid token' };
    }
  };
}

export default JWT;

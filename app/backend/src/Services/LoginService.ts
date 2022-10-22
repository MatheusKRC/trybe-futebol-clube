import bcrypt = require('bcryptjs');
import User from '../Interfaces/User';
import Service from '../Interfaces/Service';
import Login from '../Interfaces/Login';
import Users from '../database/models/Users';
import JWT from '../Utils/JWT';

class LoginService {
  postModel: Users;

  constructor() {
    this.postModel = new Users();
  }

  public login = async (body: Login):Promise<Service> => {
    const { email } = body;
    if (!email || !body.password) {
      return { status: 400, message: 'All fields must be filled' };
    }
    const getByEmail = await Users.findOne({ where: { email } });
    if (!getByEmail) {
      return { status: 401, message: 'Incorrect email or password' };
    }
    const result = bcrypt.compareSync(body.password, getByEmail.password);
    if (!result) {
      return { status: 401, message: 'Incorrect email or password',
      };
    }
    const jwt = new JWT();
    const token = jwt.generateToken(getByEmail.id, email);
    return { status: null, message: token };
  };

  getRole = async (email: string) => {
    const { dataValues } = await Users.findOne({ where: { email } }) as unknown as User;
    const { role } = dataValues;
    if (role) {
      return { status: null, message: role };
    } return { status: 400, message: 'Role Not Found' };
  };
}

export default LoginService;

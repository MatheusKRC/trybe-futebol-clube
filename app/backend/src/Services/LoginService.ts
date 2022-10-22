import bcrypt = require('bcryptjs');
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
    const jwt = new JWT(getByEmail.id, email);
    const token = jwt.generateToken();
    return { status: null, message: token };
  };
}

export default LoginService;

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
    const { password, email } = body;
    const getByEmail = await Users.findOne({ where: { email } });
    if (!getByEmail) {
      return { type: 'Email Not Found', message: 'Email Not Found' };
    }
    const result = bcrypt.compareSync(password, getByEmail.password);
    if (!result) {
      return { type: 'Password Not Equal', message: 'Invalid Password' };
    }
    const jwt = new JWT(getByEmail.id, email);
    const token = jwt.generateToken();
    return { type: null, message: token };
  };
}

export default LoginService;

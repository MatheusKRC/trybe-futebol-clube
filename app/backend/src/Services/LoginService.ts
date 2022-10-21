import bcrypt = require('bcryptjs');
import Service from '../Interfaces/Service';
import Login from '../Interfaces/Login';
import Users from '../database/models/Users';
import JWT from '../Utils/JWT';

const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

class LoginService {
  postModel: Users;

  constructor() {
    this.postModel = new Users();
  }

  public login = async (body: Login):Promise<Service> => {
    const { password, email } = body;
    if (!email || !password) {
      return { status: 400, message: 'All fields must be filled' };
    }
    if (!validateEmail(email)) {
      return { status: 401, message: 'Incorrect email or password' };
    }
    const getByEmail = await Users.findOne({ where: { email } });
    if (!getByEmail) {
      return { status: 400, message: 'Email Not Found' };
    }
    const result = bcrypt.compareSync(password, getByEmail.password);
    if (!result) {
      return { status: 400, message: 'Invalid Password' };
    }
    const jwt = new JWT(getByEmail.id, email);
    const token = jwt.generateToken();
    return { status: null, message: token };
  };
}

export default LoginService;

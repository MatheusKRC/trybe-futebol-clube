interface User {
  dataValues: dataValues
}

type dataValues = {
  id: number
  username: string
  role: string
  email: string
  password: string
};

export default User;

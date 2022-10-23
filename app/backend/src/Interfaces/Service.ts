import Teams from '../database/models/Teams';
import { dataValues } from './Team';

interface Service {
  status: null | number
  message: string | Teams[] | dataValues
}

export default Service;

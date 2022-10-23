import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;

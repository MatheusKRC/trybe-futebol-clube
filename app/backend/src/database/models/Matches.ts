import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';
// import OtherModel from './OtherModel';

class Matches extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Matches.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: INTEGER,
    },
    homeTeam: {
      allowNull: false,
      type: INTEGER,

    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeam: {
      allowNull: false,
      type: INTEGER,

    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    // teamHome: {
    //   allowNull: false,
    //   type: STRING,

    // },
    // teamAway: {
    //   allowNull: false,
    //   type: STRING,

    // },
    inProgress: {
      allowNull: false,
      type: BOOLEAN,
    },

  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Matches',
    timestamps: false,
  },

);

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatch' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayMatch' });
export default Matches;

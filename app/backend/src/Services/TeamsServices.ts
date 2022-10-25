// import Team from '../Interfaces/Team';
import Service from '../Interfaces/Service';
import Teams from '../database/models/Teams';

class TeamsServices {
  public getAll = async ():Promise<Service> => {
    const teams = await Teams.findAll();
    return { status: null, message: teams };
  };

  public getTeamById = async (id: string) => {
    const team = await Teams.findByPk(id);
    if (team) {
      return { status: null, message: team };
    }
    return { status: 400, message: 'Team Not Found' };
  };
}

export default TeamsServices;

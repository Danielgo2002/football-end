import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addTeamDto } from 'src/dto/teamDto/addTeam.dto';
import { PlayerDocument } from 'src/schemas/playerSchema';
import { Team, TeamDocument } from 'src/schemas/teamSchema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel('Team') private readonly TeamModel: Model<TeamDocument>,
    @InjectModel('Player') private readonly PlayerModel: Model<PlayerDocument>,
  ) {}

  async addTeam(addTeamDto: addTeamDto) {
    try {
      const exsistTeam = await this.TeamModel.findOne({
        name: addTeamDto.name,
      });
      if (exsistTeam) {
        return 'duplicate error. this Team alredy exsist';
      }

      const team = new this.TeamModel(addTeamDto);
      await team.save();

      return team;
    } catch (error) {
      console.log(error);
    }
  }

  // async addPlayerToTeam(team_id: string, player_id: string, player_position: string) {
  //   const findteam = await this.TeamModel.findById(Team.id);
  // }
}

// async generatePayersObject(addTeamDto: addTeamDto) {
//   const defenders = addTeamDto.formation[0];
//   return new Array(defenders);
// }

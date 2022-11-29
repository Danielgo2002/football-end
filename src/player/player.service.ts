import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addPlayerDto } from 'src/dto/playerDto/addPlayer.Dto';
import { addTeamDto } from 'src/dto/teamDto/addTeam.dto';
import { Player, PlayerDocument } from 'src/schemas/playerSchema';
import { Team, TeamDocument } from 'src/schemas/teamSchema';
import { position } from 'src/playerEnum';
@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly PlayerModel: Model<PlayerDocument>,
    @InjectModel('Team') private readonly TeamModel: Model<TeamDocument>,
  ) {}

  async addPlayer(addPlayerDto: addPlayerDto) {
    try {
      const exsistPlayer = await this.PlayerModel.findOne({
        name: addPlayerDto.name,
      });
      if (exsistPlayer) {
        return 'duplicate error. this player alredy exsist';
      }

      const Player = new this.PlayerModel(addPlayerDto);

      this.addPlayerToTeam(addPlayerDto.team_id, Player._id, Player.position);
      await Player.save();

      return Player;
    } catch (error) {
      return error;
    }
  }
  async addPlayerToTeam(
    team_id: string,
    player_id: any,
    player_position: string,
  ) {
    const findteam = await this.TeamModel.findById(team_id);
    if (!findteam) {
      return 'error';
    }
    if (player_position === position.DEFENDER) {
      const formationLength = parseInt(findteam.formation[0]); // 4

      if (findteam.defenders.length < formationLength) {
        findteam.defenders.push(player_id);
        await findteam.save();
      } else {
        throw new ForbiddenException('defenders full');
      }
    } else if (player_position === position.MIDFIELDER) {
      const formationLength = parseInt(findteam.formation[1]);

      if (findteam.midfielders.length < formationLength) {
        findteam.midfielders.push(player_id);
        await findteam.save();
      } else {
        throw new ForbiddenException('midfielders full');
      }
    } else if (player_position === position.FORWARD) {
      const formationLength = parseInt(findteam.formation[2]);

      if (findteam.Forwards.length < formationLength) {
        findteam.Forwards.push(player_id);
        await findteam.save();
      } else {
        throw new ForbiddenException('forwards full');
      }
    } else if (player_position === position.GOALKEEPER) {
      const formationLength = parseInt(findteam.formation[3]);

      if (findteam.goalkeeper.length < formationLength) {
        findteam.goalkeeper.push(player_id);
        await findteam.save();
      } else {
        throw new ForbiddenException('goalkeeper full');
      }
    }
  }
}

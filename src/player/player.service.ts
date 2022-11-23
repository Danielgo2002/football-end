import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addPlayerDto } from 'src/dto/playerDto/addPlayer.Dto';
import { addTeamDto } from 'src/dto/teamDto/addTeam.dto';
import { Player, PlayerDocument } from 'src/schemas/playerSchema';
import { Team, TeamDocument } from 'src/schemas/teamSchema';

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
      await Player.save();

      return Player;
    } catch (error) {
      console.log(error);
    }
  }
  async addPlayerToTeam(addPlayerDto: addPlayerDto, addTeamDto: addTeamDto) {
    const findteam = await this.TeamModel.findOne();
  }
}

// const addPlayerToTeeam = await this.TeamModel.findOne({player: addPlayerDto.position})
// if(addPlayerDto.position == "defender"){
//   addPlayerToTeeam.defenders.push(Player.position)

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import { Model } from 'mongoose';
import { GetTeamDto } from 'src/dto/accountdto/gettem.dto';
import { TeamDocument } from 'src/schemas/teamSchema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Team') private readonly TeamModel: Model<TeamDocument>,
  ) {}

  async getTeam(gatteamdto: GetTeamDto) {
    const findteam = await this.TeamModel.findOne({ name: gatteamdto.name });
    if (!findteam) {
      return 'no team found';
    } else {
      return findteam;
    }
  }
}

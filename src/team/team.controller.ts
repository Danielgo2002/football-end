import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { addTeamDto } from 'src/dto/teamDto/addTeam.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private TeamService: TeamService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('addTeam')
  addTeam(@Body() addTeamDto: addTeamDto) {
    return this.TeamService.addTeam(addTeamDto);
  }
}

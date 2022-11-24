import { Body, Controller, Post } from '@nestjs/common';
import { addTeamDto } from 'src/dto/teamDto/addTeam.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private TeamService: TeamService) {}

  @Post('addTeam')
  addTeam(@Body() addTeamDto: addTeamDto) {
    return this.TeamService.addTeam(addTeamDto);
  }
}

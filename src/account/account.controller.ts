import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetTeamDto } from 'src/dto/accountdto/gettem.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountservice: AccountService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getteam')
  getTeam(getteamdto: GetTeamDto) {
    return this.accountservice.getTeam(getteamdto);
  }
}

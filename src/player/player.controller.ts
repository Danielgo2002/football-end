import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { addPlayerDto } from 'src/dto/playerDto/addPlayer.Dto';
import { PlayerService } from './player.service';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('Player')
export class PlayerController {
  constructor(private PlayerService: PlayerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('addPlayer')
  addPlayer(@Body() addPlayerDto: addPlayerDto) {
    return this.PlayerService.addPlayer(addPlayerDto);
  }
}

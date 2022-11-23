import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { addPlayerDto } from 'src/dto/playerDto/addPlayer.Dto';
import { PlayerService } from './player.service';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('Player')
export class PlayerController {
  constructor(private PlayerService: PlayerService) {}

  @Post('addPlayer')
  addPlayer(@Body() addPlayerDto: addPlayerDto) {
    return this.PlayerService.addPlayer(addPlayerDto);
  }
}

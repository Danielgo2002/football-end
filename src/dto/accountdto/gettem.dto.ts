import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { position } from 'src/playerEnum';
import { Player } from 'src/schemas/playerSchema';

export class GetTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

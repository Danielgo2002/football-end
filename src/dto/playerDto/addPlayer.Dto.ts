import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Player } from 'src/schemas/playerSchema';
import { position } from './playerEnum';

export class addPlayerDto {
  @IsNotEmpty()
  @IsString()
  team_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(position)
  position: position;
}

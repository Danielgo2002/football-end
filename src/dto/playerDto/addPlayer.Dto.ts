import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { position } from 'src/playerEnum';
import { Player } from 'src/schemas/playerSchema';

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

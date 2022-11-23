import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Player } from 'src/schemas/playerSchema';

export class addTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  formation: string;
}

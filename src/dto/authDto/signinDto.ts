import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class signinDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  password: number;
}

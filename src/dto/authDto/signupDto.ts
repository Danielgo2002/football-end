import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class signupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsNotEmpty()
  @IsNumber()
  password: string;

  hash: string;
}

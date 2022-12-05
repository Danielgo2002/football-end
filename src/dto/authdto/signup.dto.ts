import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class signupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  hash: string;
}

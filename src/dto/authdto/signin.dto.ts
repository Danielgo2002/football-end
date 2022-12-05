import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signinDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

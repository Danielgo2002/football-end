import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { signinDto } from 'src/dto/authDto/signinDto';
import { signupDto } from 'src/dto/authDto/signupDto';
import { AuthService } from './auth.service';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: signupDto) {
    return this.authservice.signup(signupDto);
  }

  // @Post('signin')
  // signin(@Body() signinDto: signinDto){

  //     return this.authservice.
  // }
}

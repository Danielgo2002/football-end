import { Body, Controller, Post } from '@nestjs/common';
import { signinDto, signupDto } from 'src/dto/authdto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: signupDto) {
    return this.authservice.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: signinDto) {
    return this.authservice.signin(signinDto);
  }
}

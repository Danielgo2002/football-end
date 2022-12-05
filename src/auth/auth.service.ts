import { Injectable } from '@nestjs/common';
import { signinDto, signupDto } from 'src/dto/authdto';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDocument } from 'src/schemas/account.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Account')
    private readonly AccountModel: Model<AccountDocument>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async signup(signupDto: signupDto) {
    try {
      const exsistuser = await this.AccountModel.findOne({
        email: signupDto.email,
      });
      if (exsistuser) {
        return 'duplicate error';
      }

      signupDto.hash = await argon.hash(signupDto.password);
      delete signupDto.password;
      delete signupDto.hash;
      const user = await new this.AccountModel(signupDto);

      await user.save();

      const access_Token = await (
        await this.signToken(user.email)
      ).access_token;
      const refresh_token = await (
        await this.refreshToken(user.email)
      ).refresh_token;

      return {
        access_Token,

        refresh_token,
      };
    } catch {}
  }

  async signin(signinDto: signinDto) {
    const user = await this.AccountModel.findOne({ email: signinDto.email });
    if (!user) {
      return 'user not found';
    }
    const access_Token = await (await this.signToken(user.email)).access_token;
    const refresh_token = await (
      await this.refreshToken(user.email)
    ).refresh_token;

    return {
      access_Token,

      refresh_token,
    };
  }

  async signToken(email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  async refreshToken(email: string): Promise<{ refresh_token: string }> {
    const payload = {
      sub: email,
    };
    const secret = this.config.get('JWT_SECRET_REFRESH');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { refresh_token: token };
  }
}

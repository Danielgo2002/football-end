import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { signupDto } from 'src/dto/authDto/signupDto';
import { AdminDocument } from 'src/schemas/adminSchema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Admin') private readonly AdminModel: Model<AdminDocument>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(signupDto: signupDto) {
    try {
      const existAdmin = await this.AdminModel.findOne({
        name: signupDto.name,
      });
      if (existAdmin) {
        return 'dupllicate error';
      }

      signupDto.hash = await argon.hash(signupDto.password);
      delete signupDto.password;
      const user = new this.AdminModel(signupDto);
      await user.save();
      const admin_access_Token = await (
        await this.AdminsignToken(user.id, user.gmail)
      ).Admin_access_token;
      const admin_refresh_Token = await (
        await this.Admin_refresh_Tokens(user.id, user.gmail)
      ).Admin_refresh_Token;
      return {
        admin_access_Token,

        admin_refresh_Token,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async AdminsignToken(
    userid: string,
    email: string,
  ): Promise<{ Admin_access_token: string }> {
    const payload = {
      sub: userid,
      email,
    };
    const secret = this.config.get('AccessADMIN_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      Admin_access_token: token,
    };
  }

  async Admin_refresh_Tokens(
    userid: string,
    email: string,
  ): Promise<{ Admin_refresh_Token: string }> {
    const payload = {
      sub: userid,
      email,
    };
    const secret = this.config.get('REFADMIN_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });
    return {
      Admin_refresh_Token: token,
    };
  }

  async Admin_refresh(account) {
    const Admin_access_Token = await this.AdminsignToken(
      account._id,
      account.email,
    );
    return Admin_access_Token;
  }
}

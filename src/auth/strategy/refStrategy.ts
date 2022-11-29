import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminDocument } from 'src/schemas/adminSchema';

@Injectable()
export class RefStrategy extends PassportStrategy(Strategy, 'ref') {
  constructor(
    @InjectModel('Admin') private readonly AdminModel: Model<AdminDocument>,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('REF_SECRET '),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const result = await this.AdminModel.findById(payload.sub);
    const account = result;
    if (account.hash) delete account.hash;
    return account;
  }
}

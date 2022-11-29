import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from 'src/admin/admin.service';
import { Admin, AdminSchema } from 'src/schemas/adminSchema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefStrategy } from './strategy/refStrategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],

  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy, RefStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AccountService } from './account/account.service';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot('mongodb://localhost/football-end'),
    TeamModule,
    PlayerModule,
    AuthModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

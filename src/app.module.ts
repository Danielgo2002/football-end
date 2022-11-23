import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/football-end'),
    TeamModule,
    PlayerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

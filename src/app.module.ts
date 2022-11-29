import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/football-end'),
    TeamModule,
    PlayerModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}

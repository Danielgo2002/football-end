import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TeamDocument } from './teamSchema';

export type PlayerDocument = Player & Document;
@Schema()
export class Player {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }] })
  team_id: TeamDocument[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  position: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

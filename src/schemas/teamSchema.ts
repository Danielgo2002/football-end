import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PlayerDocument } from './playerSchema';

export type TeamDocument = Team & Document;
@Schema()
export class Team {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  formation: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }] })
  defenders: PlayerDocument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }] })
  midfielders: PlayerDocument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }] })
  Forwards: PlayerDocument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }] })
  goalkeeper: PlayerDocument[];
}
export const TeamSchema = SchemaFactory.createForClass(Team);

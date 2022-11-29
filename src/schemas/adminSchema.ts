import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TeamDocument } from './teamSchema';

export type AdminDocument = Admin & Document;
@Schema()
export class Admin {
  //   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }] })
  //   team_id: TeamDocument[];

  @Prop({ required: true, type: String, unique: true })
  gmail: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  last_Name: string;

  @Prop({ required: true })
  password: number;

  @Prop()
  hash: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

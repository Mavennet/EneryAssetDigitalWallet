import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Document, ObjectId, Types, SchemaTypes } from 'mongoose';
import { Offsets } from './offsets.schema';
import * as mongoose from 'mongoose';

export type EmissionsDocument = Emissions & Document;

@Schema()
export class Emissions {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  address: String;

  @Prop()
  name: String;

  @Prop()
  block: Number;

  @Prop()
  kgCO2: Number;

  @Prop()
  decimals: Number;

  @Prop()
  retired_kgCO2: Number;

  @Prop()
  emission_date: Date;

  @Prop()
  emission_type: Number;

  @Prop()
  emission_accuracy: Number;

  //@Prop({ type: SchemaTypes.ObjectId, ref: 'Offsets', required:true })
  //offset!: Types.ObjectId[]; 


};

export const EmissionsSchema = SchemaFactory.createForClass(Emissions);

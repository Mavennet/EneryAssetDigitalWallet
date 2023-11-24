
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Document, ObjectId, Types, SchemaTypes } from 'mongoose';
import { Emissions } from './emissions.schema';

import * as mongoose from 'mongoose';

export type OffsetsDocument = Offsets & Document;

@Schema()
export class Offsets {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  symbol: String;

  @Prop()  
  address: String;

  @Prop()  
  available: Number;

  @Prop()  
  retired: Number;
  
  @Prop()
  decimals: Number;

  @Prop()
  emission: String; 

  @Prop()
  emissionaddress: String; 
};

export const OffsetsSchema = SchemaFactory.createForClass(Offsets);
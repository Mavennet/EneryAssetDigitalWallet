import * as mongoose from 'mongoose';

export const RetireSchema = new mongoose.Schema({
  emission: String,
  emissionaddress: String,
  symbol: String,
  offsetaddress: String,
  block: Number,
  kgCO2: Number,
  decimals: Number,
});
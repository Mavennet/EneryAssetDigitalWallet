import * as mongoose from 'mongoose';

export const OracleSchema = new mongoose.Schema({
  symbol: String,
  address: String,
  decimals: Number,
});
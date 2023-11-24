import * as mongoose from 'mongoose';

export const SettingsSchema = new mongoose.Schema({
  oracle: String,
  factory: String,
  token: String,
  provider: String,
  account: String
});
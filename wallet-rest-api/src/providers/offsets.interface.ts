import { Document, ObjectId } from 'mongoose';

export interface Offsets extends Document {
    readonly symbol: String,
    readonly address: String,
    readonly available: Number,
    readonly retired: Number,
    readonly decimals: Number,
    readonly emission: String,
    readonly emissionaddress: String
}
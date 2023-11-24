export interface Oracle extends Document {
    readonly symbol: String,
    readonly address: String,
    readonly decimals: Number,
}
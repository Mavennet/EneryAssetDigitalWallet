export interface Retire extends Document {
    readonly emission: String,
    readonly emissionaddress: String,
    readonly symbol: String,
    readonly offsetaddress: String,
    readonly block: Number,
    readonly kgCO2: Number,
    readonly decimals: Number,
}

export interface Emissions extends Document {
    readonly address: String,
    readonly name: String,
    readonly block: Number,
    readonly kgCO2: Number,
    readonly decimals: Number,
    readonly retired_kgCO2: Number,
    readonly emission_date: Date,
    readonly emission_type: Number,
    readonly emission_accuracy: Number
}
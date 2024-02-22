import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateEmissionDto {
    @ApiProperty()
    name: String;

    @ApiProperty()
    address: String;

    @ApiProperty()
    block: Number;

    @ApiProperty()
    kgCO2: Number;

    @ApiProperty()
    decimals: Number;

    @ApiProperty()
    retired_kgCO2: Number;

    @ApiProperty()
    emission_date: Number;

    @ApiProperty()
    emission_type: Number;

    @ApiProperty()
    emission_accuracy: Number;
}

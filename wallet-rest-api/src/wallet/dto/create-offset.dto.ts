import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export class CreateOffsetDto {
    @ApiProperty()
    symbol: String;

    @ApiProperty()
    address: String;

    @ApiProperty()
    available: Number;

    @ApiProperty()
    retired: Number;

    @ApiProperty()
    decimals: Number;

    @ApiProperty()
    emission: String;

    @ApiProperty()
    emissionaddress: String;

}

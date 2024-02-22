import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export class RetireOffsetDto {
    @ApiProperty()
    address: String;

    @ApiProperty()
    available: Number;

    @ApiProperty()
    retired: Number;

    @ApiProperty()
    emissionaddress: String;
}

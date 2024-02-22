import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

export class CreateSettingsDto {
    @ApiProperty()
    oracle: String;

    @ApiProperty()
    factory: String;

    @ApiProperty()
    token: String;

    @ApiProperty()
    provider: String;

    @ApiProperty()
    account: String;

}

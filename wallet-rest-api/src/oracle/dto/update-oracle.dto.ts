import { ApiProperty } from '@nestjs/swagger';

export class UpdateOracleDto {
    @ApiProperty()
    symbol: String;

    @ApiProperty()
    address: String;

    @ApiProperty()
    decimals: Number;
}
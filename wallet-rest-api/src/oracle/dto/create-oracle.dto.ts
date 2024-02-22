import { ApiProperty } from '@nestjs/swagger';

export class CreateOracleDto {
    @ApiProperty()
    symbol: String;

    @ApiProperty()
    address: String;

    @ApiProperty()
    decimals: Number;
}

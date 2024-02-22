import { ApiProperty } from '@nestjs/swagger';

export class CreateRetireDto {
    @ApiProperty()
    emission: String;

    @ApiProperty()
    emissionaddress: String;

    @ApiProperty()
    symbol: String;

    @ApiProperty()
    offsetaddress: String;

    @ApiProperty()
    block: Number;

    @ApiProperty()
    kgCO2: Number;

    @ApiProperty()
    decimals: Number;
 
}

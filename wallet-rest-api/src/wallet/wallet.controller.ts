import { Controller, Get, Post, Param, Body, Res , Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateOffsetDto } from './dto/create-offset.dto';
import { RetireOffsetDto } from './dto/retire-offset.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    // get a list of records based on sort, filter, and pagination
    @Get('')
    async getDefault(@Res() response, @Query() query: {"_end": number, "_order": string, "_sort": string, "_start": number}): Promise<any> {
      console.log("getList query=", query);

      const values = await this.walletService.findAll(query)
      response.set('Access-Control-Expose-Headers', 'X-Total-Count')
      response.set('X-Total-Count', values.total)
      response.status(200).send(values.page);

    }

    // get a single record by id
    @Get(':id')
    defaultId(@Param() params: any): Promise<any> {
        return this.walletService.getOne(params.id);
    }

    // create a record
    @Post('create')
    createEmission(@Body() createOffsetDto: CreateOffsetDto): Promise<any> {
        return this.walletService.create(createOffsetDto);
    }

    // retire offset
    @Post('retire')
    retire(@Body() retireOffsetDto: RetireOffsetDto): Promise<any> {
        return this.walletService.retire(retireOffsetDto);
    }

}

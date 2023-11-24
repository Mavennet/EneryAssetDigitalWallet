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

    @Get('getList')
    getList(): Promise<any> {
      return this.walletService.dummy();
    }

    // get a single record by id
    @Get(':id')
    defaultId(@Param() params: any): Promise<any> {
        return this.walletService.getOne(params.id);
    }

    @Post('getOne')
    getOne(): Promise<any> {
        return this.walletService.dummy();
    }


    // get a list of records based on an array of ids
    @Post('getMany')
    getMany(): Promise<any> {
        return this.walletService.dummy();
    }

    // get the records referenced to another record, e.g. comments for a post
    @Post('getManyReference')
    getManyReference(): Promise<any> {
        return this.walletService.dummy();
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

    // update a list of records based on an array of ids and a common patch
    @Post('updateMany')
    updateMany(): Promise<any> {
        return this.walletService.dummy();
    }

    // delete a record by id
    @Post('delete')
    delete(): Promise<any> {
        return this.walletService.dummy();
    }

    // delete a list of records based on an array of ids
    @Post('deleteMany')
    deleteMany(): Promise<any> {
        return this.walletService.dummy();
    }

}

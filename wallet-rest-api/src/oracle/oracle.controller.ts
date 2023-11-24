import { Controller, Get, Post, Body, Put, Query, Res, Param } from '@nestjs/common';
import { OracleService } from './oracle.service';
import { CreateOracleDto } from './dto/create-oracle.dto';
import { UpdateOracleDto } from './dto/update-oracle.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Oracle')
@Controller('oracle')
export class OracleController {
    constructor(private oracleService: OracleService) {}

    // get a list of records based on sort, filter, and pagination
    @Get('')
    async getDefault(@Res() response, @Query() query: {"_end": number, "_order": string, "_sort": string, "_start": number}): Promise<any> {
      console.log("getList query=", query);

      const values = await this.oracleService.findAll(query)
      response.set('Access-Control-Expose-Headers', 'X-Total-Count')
      response.set('X-Total-Count', values.total)
      response.status(200).send(values.page);

    }    

    @Get('getList')
    getList(): Promise<any> {
      return this.oracleService.dummy();
    }

    // get a single record by id
    @Get(':id')
    defaultId(@Param() params: any): Promise<any> {
        return this.oracleService.getOne(params.id);
    }

    @Post('getOne')
    getOne(): Promise<any> {
        return this.oracleService.dummy();
    }


    // get a list of records based on an array of ids
    @Post('getMany')
    getMany(): Promise<any> {
        return this.oracleService.dummy();
    }

    // get the records referenced to another record, e.g. comments for a post
    @Post('getManyReference')
    getManyReference(): Promise<any> {
        return this.oracleService.dummy();
    }

    // create a record
    @Post('')
    postCreateEmission(@Body() createOracleDto: CreateOracleDto): Promise<any> {
        return this.oracleService.create(createOracleDto);
    }


    // create a record
    @Post('create')
    createEmission(@Body() createOracleDto: CreateOracleDto): Promise<any> {
        return this.oracleService.create(createOracleDto);
    }

    // update a record based on a patch
    @Put(':id')
    update(@Param() params: any, @Body() updateOracleDto: UpdateOracleDto): Promise<any> {
        return this.oracleService.update(params.id, updateOracleDto);
    }

    // update a list of records based on an array of ids and a common patch
    @Post('updateMany')
    updateMany(): Promise<any> {
        return this.oracleService.dummy();
    }

    // delete a record by id
    @Post('delete')
    delete(): Promise<any> {
        return this.oracleService.dummy();
    }

    // delete a list of records based on an array of ids
    @Post('deleteMany')
    deleteMany(): Promise<any> {
        return this.oracleService.dummy();
    }

}

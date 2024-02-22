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

    // get a single record by id
    @Get(':id')
    defaultId(@Param() params: any): Promise<any> {
        return this.oracleService.getOne(params.id);
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

}

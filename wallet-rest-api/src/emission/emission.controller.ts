import { Controller, Req, Get, Put, Post, Body, Query, Res, Param } from '@nestjs/common';
import { EmissionService } from './emission.service';
import { CreateEmissionDto } from './dto/create-emission.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Emission')
@Controller('emission')
export class EmissionController {
    constructor(private emissionService: EmissionService) {}

    // get a list of records based on sort, filter, and pagination
    @Get('')
    async getDefault(@Res() response, @Query() query: {"_end": number, "_order": string, "_sort": string, "_start": number}): Promise<any> {
      console.log("getList query=", query);

      const values = await this.emissionService.findAll(query)
      response.set('Access-Control-Expose-Headers', 'X-Total-Count')
      response.set('X-Total-Count', values.total)
      response.status(200).send(values.page);

    }
    
    @Get('getList')
    getList(): Promise<any> {
      return this.emissionService.dummy();
    }

    // get a single record by id
    @Get(':id')
    defaultId(@Param() params: any): Promise<any> {
        return this.emissionService.getOne(params.id);
    }

        // get a single record by id
    @Put(':id')
    async putId(@Req() req): Promise<any> {
        console.log("Params=", req.body);
        let retval = await this.emissionService.putId(req.body);
        console.log("Returns:", retval);
        return retval;
    }

    @Post('getOne')
    getOne(): Promise<any> {
        return this.emissionService.dummy();
    }


    // get a list of records based on an array of ids
    @Post('getMany')
    getMany(): Promise<any> {
        return this.emissionService.dummy();
    }

    // get the records referenced to another record, e.g. comments for a post
    @Post('getManyReference')
    getManyReference(): Promise<any> {
        return this.emissionService.dummy();
    }

    // create a record
    @Post('create')
    createEmission(@Body() createEmissionDto: CreateEmissionDto): Promise<any> {
        return this.emissionService.create(createEmissionDto);
    }

    // update a record based on a patch
    @Post('update')
    update(): Promise<any> {
        return this.emissionService.dummy();
    }

    // update a list of records based on an array of ids and a common patch
    @Post('updateMany')
    updateMany(): Promise<any> {
        return this.emissionService.dummy();
    }

    // delete a record by id
    @Post('delete')
    delete(): Promise<any> {
        return this.emissionService.dummy();
    }

    // delete a list of records based on an array of ids
    @Post('deleteMany')
    deleteMany(): Promise<any> {
        return this.emissionService.dummy();
    }



}

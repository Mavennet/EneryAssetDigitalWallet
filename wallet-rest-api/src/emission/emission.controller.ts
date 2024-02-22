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

    // create a record
    @Post('create')
    createEmission(@Body() createEmissionDto: CreateEmissionDto): Promise<any> {
        return this.emissionService.create(createEmissionDto);
    }
}

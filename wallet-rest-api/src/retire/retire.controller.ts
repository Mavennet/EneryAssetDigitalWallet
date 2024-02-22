import { Controller, Get, Post, Body, Query, Res, Param } from '@nestjs/common';
import { RetireService } from './retire.service';
import { CreateRetireDto } from './dto/create-retire.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Retire')
@Controller('retire')
export class RetireController {
    constructor(private retireService: RetireService) {}

    // get a list of records based on sort, filter, and pagination
    @Get('')
    async getDefault(@Res() response, @Query() query: {"_end": number, "_order": string, "_sort": string, "_start": number}): Promise<any> {
        console.log("getList query=", query);

        const values = await this.retireService.findAll(query)
        response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        response.set('X-Total-Count', values.total)
        response.status(200).send(values.page);

    }

    // get a single record by id
    @Get(':id')
    defaultId(@Param() params: any): Promise<any> {
        return this.retireService.getOne(params.id);
    }

    // create a record
    @Post('create')
    createEmission(@Body() createRetireDto: CreateRetireDto): Promise<any> {
        return this.retireService.create(createRetireDto);
    }

}

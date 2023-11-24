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

    @Get('getList')
    getList(): Promise<any> {
      return this.retireService.dummy();
    }

    // get a single record by id
    @Get(':id')
    defaultId(@Param() params: any): Promise<any> {
        return this.retireService.getOne(params.id);
    }

    @Post('getOne')
    getOne(): Promise<any> {
        return this.retireService.dummy();
    }


    // get a list of records based on an array of ids
    @Post('getMany')
    getMany(): Promise<any> {
        return this.retireService.dummy();
    }

    // get the records referenced to another record, e.g. comments for a post
    @Post('getManyReference')
    getManyReference(): Promise<any> {
        return this.retireService.dummy();
    }

    // create a record
    @Post('create')
    createEmission(@Body() createRetireDto: CreateRetireDto): Promise<any> {
        return this.retireService.create(createRetireDto);
    }

    // update a record based on a patch
    @Post('update')
    update(): Promise<any> {
        return this.retireService.dummy();
    }

    // update a list of records based on an array of ids and a common patch
    @Post('updateMany')
    updateMany(): Promise<any> {
        return this.retireService.dummy();
    }

    // delete a record by id
    @Post('delete')
    delete(): Promise<any> {
        return this.retireService.dummy();
    }

    // delete a list of records based on an array of ids
    @Post('deleteMany')
    deleteMany(): Promise<any> {
        return this.retireService.dummy();
    }

    
}

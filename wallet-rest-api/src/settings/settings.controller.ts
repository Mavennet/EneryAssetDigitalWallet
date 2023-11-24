import { Controller, Get, Post, Body, Query, Res, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingsDto } from './dto/create-settings.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
    constructor(private settingsService: SettingsService) {}

    // get a list of records based on sort, filter, and pagination
    @Get('')
    async getDefault(@Res() response, @Query() query: {"_end": number, "_order": string, "_sort": string, "_start": number}): Promise<any> {
      console.log("getList query=", query);

      const values = await this.settingsService.findAll(query)
      response.set('Access-Control-Expose-Headers', 'X-Total-Count')
      response.set('X-Total-Count', values.total)
      response.status(200).send(values.page);

    }

    @Get('getList')
    getList(): Promise<any> {
      return this.settingsService.dummy();
    }

    @Get('getFirst')
    getFirst(): Promise<any> {
        console.log('Controller getFirst');
        return this.settingsService.getFirst();
    }

    // get a single record by id
    @Get(':id')
    defaultId(@Param() params: any): Promise<any> {
        return this.settingsService.getOne(params.id);
    }


    @Post('getOne')
    getOne(): Promise<any> {
        return this.settingsService.dummy();
    }


    // get a list of records based on an array of ids
    @Post('getMany')
    getMany(): Promise<any> {
        return this.settingsService.dummy();
    }

    // get the records referenced to another record, e.g. comments for a post
    @Post('getManyReference')
    getManyReference(): Promise<any> {
        return this.settingsService.dummy();
    }

    // create a record
    @Post('create')
    createEmission(@Body() createSettingsDto: CreateSettingsDto): Promise<any> {
        return this.settingsService.create(createSettingsDto);
    }

    // update a record based on a patch
    @Post('update')
    update(): Promise<any> {
        return this.settingsService.dummy();
    }

    // update a list of records based on an array of ids and a common patch
    @Post('updateMany')
    updateMany(): Promise<any> {
        return this.settingsService.dummy();
    }

    // delete a record by id
    @Post('delete')
    delete(): Promise<any> {
        return this.settingsService.dummy();
    }

    // delete a list of records based on an array of ids
    @Post('deleteMany')
    deleteMany(): Promise<any> {
        return this.settingsService.dummy();
    }


}

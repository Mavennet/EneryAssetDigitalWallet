import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Settings } from '../providers/settings.interface';
import { CreateSettingsDto } from './dto/create-settings.dto';

@Injectable()
export class SettingsService {
    constructor(
        @Inject('SETTINGS_MODEL')
        private settingsModel: Model<Settings>,
    ) {}    

    async create(createSettingsDto: CreateSettingsDto): Promise<Settings> {
        console.log("Create a settings database record");
        const createdSettings = new this.settingsModel(createSettingsDto);
        return await createdSettings.save();
    }
    
    async findAll(query: any): Promise<any> {
        //query.id = query._id;
        let list = await this.settingsModel.find().lean().exec();
        let page = await list.map(settings => {
            console.log(settings);
            settings['id'] = settings._id.toString();
            delete settings._id;
            return settings;
        })
        console.log("list=", page)
        return {page: page, total: page.length}
    }    

    async getOne(id: string): Promise<any> {
        let settings = await this.settingsModel.findById(id).lean().exec();
        settings['id'] = settings._id.toString();
        delete settings._id;
        console.log("list=", settings)
        return settings;
    }    

    async getFirst(): Promise<any> {
        console.log('getFirst');
        let settings = await this.settingsModel.find().sort({ account: -1 }).limit(1).lean().exec();
        console.log("first=", settings)
        return settings;
    }    

    async dummy(): Promise<any> {
        return {}
    }  
    
}

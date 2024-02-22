import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Emissions } from '../providers/emissions.interface';
import { CreateEmissionDto } from './dto/create-emission.dto';

@Injectable()
export class EmissionService {
    constructor(
        @Inject('EMISSIONS_MODEL')
        private emissionsModel: Model<Emissions>,
    ) {}    

    async create(createEmissionDto: CreateEmissionDto): Promise<Emissions> {
        console.log("Create an emission database record");
        const createdEmission = new this.emissionsModel(createEmissionDto);
        return await createdEmission.save();
      }
    
    async findAll(query: any): Promise<any> {
        let list = await this.emissionsModel.find().lean().exec();
        let page = await list.map(emission => {
            console.log(emission);
            emission['id'] = emission._id.toString();
            delete emission._id;
            return emission;
        })
        console.log("list=", page)
        return {page: page, total: page.length}
    }    

    async getOne(id: string): Promise<any> {
        let emission = await this.emissionsModel.findById(id).lean().exec();
        emission['id'] = emission._id.toString();
        delete emission._id;
        console.log("list=", emission)
        return emission;
    }    

    async putId(body: any): Promise<any> {
        let emission = await this.emissionsModel.updateOne({_id: body.id}, body);
        return body;
    }    

}

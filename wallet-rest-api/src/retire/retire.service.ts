import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Retire } from '../providers/retire.interface';
import { CreateRetireDto } from './dto/create-retire.dto';

@Injectable()
export class RetireService {
    constructor(
        @Inject('RETIRE_MODEL')
        private retireModel: Model<Retire>,
    ) {}    

    async create(createRetireDto: CreateRetireDto): Promise<Retire> {
        console.log("Create an emission retirement database record");
        const createdRetire = new this.retireModel(createRetireDto);
        return await createdRetire.save();
    }
    
    async findAll(query: any): Promise<any> {
        //query.id = query._id;
        let list = await this.retireModel.find().lean().exec();
        let page = await list.map(retire => {
            console.log(retire);
            retire['id'] = retire._id.toString();
            delete retire._id;
            return retire;
        })
        console.log("list=", page)
        return {page: page, total: page.length}
    }    

    async getOne(id: string): Promise<any> {
        let retire = await this.retireModel.findById(id).lean().exec();
        retire['id'] = retire._id.toString();
        delete retire._id;
        console.log("list=", retire)
        return retire;
    }    

    async dummy(): Promise<any> {
        return {}
    }  

}

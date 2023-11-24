import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Offsets } from '../providers/offsets.interface';
import { Emissions } from '../providers/emissions.interface';
import { CreateOffsetDto } from './dto/create-offset.dto';
import { RetireOffsetDto } from './dto/retire-offset.dto';

@Injectable()
export class WalletService {
    constructor(
        @Inject('OFFSETS_MODEL')
        private offsetsModel: Model<Offsets>,
    ) {}    

    async create(createOffsetDto: CreateOffsetDto): Promise<Offsets> {
        console.log("Create an offset database record");
        console.log("Wallet entry=", createOffsetDto);
        const createdOffset = new this.offsetsModel(createOffsetDto);
        return await createdOffset.save();
      }
    
    async findAll(query: any): Promise<any> {
        //query.id = query._id;
        let list = await this.offsetsModel.find().populate('emission').lean().exec();
        let page = await list.map(offset => {
            console.log(offset);
            offset['id'] = offset._id.toString();
            delete offset._id;
            return offset;
        })
        console.log("list=", page)
        return {page: page, total: page.length}
    }    

    
    async getOne(id: string): Promise<any> {
        let offset = await this.offsetsModel.findById(id).lean().exec();
        offset['id'] = offset._id.toString();
        delete offset._id;
        console.log("list=", offset)
        return offset;
    }    

    async retire(retireOffsetDto: RetireOffsetDto): Promise<any> {
        const updatedOracle = await this.offsetsModel.findOneAndUpdate({address: retireOffsetDto.address, emissionaddress: retireOffsetDto.emissionaddress}, {available: retireOffsetDto.available, retired: retireOffsetDto.retired});
        return updatedOracle;
    }    

    async dummy(): Promise<any> {
        return {}
    }    

}

import { Model, TypeExpressionOperatorReturningObjectId, Types } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Oracle } from '../providers/oracle.interface';
import { CreateOracleDto } from './dto/create-oracle.dto';
import { UpdateOracleDto } from './dto/update-oracle.dto';


@Injectable()
export class OracleService {
    constructor(
        @Inject('ORACLE_MODEL')
        private oracleModel: Model<Oracle>,
    ) {}    

    async create(createOracleDto: CreateOracleDto): Promise<Oracle> {
        console.log("Create an oracle acceptable offset token database record");
        const createdOracle = new this.oracleModel(createOracleDto);
        return await createdOracle.save();
    }

    async update(id: string, updateOracleDto: UpdateOracleDto): Promise<any> {
        console.log("Update an oracle acceptable offset token database record");
        const updatedOracle = await this.oracleModel.findOneAndUpdate({_id: id}, {id: id, symbol: updateOracleDto.symbol, address: updateOracleDto.address, decimals: updateOracleDto.decimals});
        return updateOracleDto;
    }
    

    async findAll(query: any): Promise<any> {
        let list = await this.oracleModel.find().lean().exec();
        let page = await list.map(oracle => {
            console.log(oracle);
            oracle['id'] = oracle._id.toString();
            delete oracle._id;
            return oracle;
        })
        console.log("list=", page)
        return {page: page, total: page.length}
    }    

    async getOne(id: string): Promise<any> {
        let oracle = await this.oracleModel.findById(id).lean().exec();
        oracle['id'] = oracle._id.toString();
        delete oracle._id;
        console.log("list=", oracle)
        return oracle;
    }    

}

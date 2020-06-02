import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>){}


    async findByProduct(product_name: string): Promise<ProductEntity>{

        return await this.productRepo.findOne({where: {product_name}, relations:['imgPaths','category']})

    }

    async findAllProduct(): Promise<ProductEntity[]>{
        return await this.productRepo.find({relations:['imgPaths','category']})
    }


}

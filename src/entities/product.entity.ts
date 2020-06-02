import { AbstractEntity } from "./abtract-entity";
import { IsString, IsNumber } from "class-validator";
import { Column, Entity, OneToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { PhotoEntity } from "./photo.entity";
import { CategoryEntity } from "./category.entity";

@Entity('products')
export abstract class ProductEntity extends AbstractEntity {

    @Column()
    @IsString()
    productName: string

    @Column()
    @IsString()
    productDesc: string

    @Column()
    @IsNumber()
    productPrice: number

    @Column()
    @IsNumber()
    quantity: number

    @OneToOne(
        type => CategoryEntity,
        category => category.id
    )
    @JoinColumn()
    category: CategoryEntity

    @OneToMany(
        type => PhotoEntity,
        product => product.productId,
      )
    imgPaths: PhotoEntity[];
}
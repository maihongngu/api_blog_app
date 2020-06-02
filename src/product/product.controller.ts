import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/:productName')
  async findProduct(@Param('productName') productName: string) {
    const product = await this.productService.findByProduct(productName);

    if (!product) {
      throw new NotFoundException('Invalid Product');
    }
    return { product: product };
  }

  @Get()
  async findAllProducts() {
    const listProducts = await this.productService.findAllProduct();

    if (!listProducts) {
      throw new NotFoundException('Load product list failed');
    }
    if (listProducts.length === 0) {
      return { load: { status: 'List is empty' } };
    }

    return { productList: { listProducts } };
  }

  
}

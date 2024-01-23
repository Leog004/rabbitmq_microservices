import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all(): Promise<Product[]> {
    return this.productService.all();
  }

  @EventPattern('hello')
  async hello(data: string | Product) {
    const timeString = new Date().toLocaleTimeString();
    console.log(data, timeString);
  }

  @EventPattern('product_created')
  async productCreated(product: Product): Promise<void> {
    const timeString = new Date().toLocaleTimeString();
    console.log(product, timeString);

    const newProduct = await this.productService.create(product);
    console.log(`newProduct: ${newProduct}`);
  }

  @EventPattern('product_updated')
  async productUpdated(product: Product): Promise<void> {
    const timeString = new Date().toLocaleTimeString();

    const updatedProduct = await this.productService.update(
      product.id,
      product,
    );

    console.log(`updatedProduct: ${updatedProduct} at ${timeString}`);
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number): Promise<void> {
    const timeString = new Date().toLocaleTimeString();

    const deletedProduct = await this.productService.delete(id);

    console.log(`deletedProduct: ${deletedProduct} at ${timeString}`);
  }
}

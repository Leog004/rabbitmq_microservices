import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './Dto/create.product.dto';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async all(): Promise<Product[]> {
    const products = await this.productService.all();

    if (!products) {
      this.client.emit('hello', 'error from RabbitMQ');
      throw new NotFoundException('Products not found');
    }

    this.client.emit('hello', products);
    return this.productService.all();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Product> {
    const product = await this.productService.get(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productService.create(createProductDto);

    this.client.emit('product_created', product);

    return product;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    const productUpdated = await this.productService.update(
      id,
      updateProductDto,
    );

    this.client.emit('product_updated', productUpdated);

    return productUpdated;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    this.client.emit('product_deleted', id);
    return this.productService.delete(id);
  }
}

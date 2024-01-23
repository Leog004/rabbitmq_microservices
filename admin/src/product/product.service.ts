import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './Dto/create.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async get(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async create(data: CreateProductDto): Promise<Product> {
    return this.productRepository.save(data);
  }

  async update(id: number, data: CreateProductDto): Promise<Product> {
    await this.productRepository.update(id, data);
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async delete(id: number): Promise<any> {
    await this.productRepository.delete(id);
  }
}

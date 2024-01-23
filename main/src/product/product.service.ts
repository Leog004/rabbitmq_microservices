import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async get(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async create(product: Product): Promise<Product> {
    return new this.productModel(product).save();
  }

  async update(id: number, product: Product): Promise<Product> {
    return this.productModel.findOneAndUpdate({ id: id }, product);
  }

  async delete(id: number): Promise<any> {
    return this.productModel.findOneAndDelete({ id: id });
  }
}

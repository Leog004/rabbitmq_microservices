import { ProductService } from './product.service';
import { Product } from './product.model';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    all(): Promise<Product[]>;
    hello(data: string | Product): Promise<void>;
    productCreated(product: Product): Promise<void>;
    productUpdated(product: Product): Promise<void>;
    productDeleted(id: number): Promise<void>;
}

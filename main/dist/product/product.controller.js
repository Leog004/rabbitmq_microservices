"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_model_1 = require("./product.model");
const microservices_1 = require("@nestjs/microservices");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async all() {
        return this.productService.all();
    }
    async hello(data) {
        const timeString = new Date().toLocaleTimeString();
        console.log(data, timeString);
    }
    async productCreated(product) {
        const timeString = new Date().toLocaleTimeString();
        console.log(product, timeString);
        const newProduct = await this.productService.create(product);
        console.log(`newProduct: ${newProduct}`);
    }
    async productUpdated(product) {
        const timeString = new Date().toLocaleTimeString();
        const updatedProduct = await this.productService.update(product.id, product);
        console.log(`updatedProduct: ${updatedProduct} at ${timeString}`);
    }
    async productDeleted(id) {
        const timeString = new Date().toLocaleTimeString();
        const deletedProduct = await this.productService.delete(id);
        console.log(`deletedProduct: ${deletedProduct} at ${timeString}`);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "all", null);
__decorate([
    (0, microservices_1.EventPattern)('hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "hello", null);
__decorate([
    (0, microservices_1.EventPattern)('product_created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_model_1.Product]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productCreated", null);
__decorate([
    (0, microservices_1.EventPattern)('product_updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_model_1.Product]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productUpdated", null);
__decorate([
    (0, microservices_1.EventPattern)('product_deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productDeleted", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map
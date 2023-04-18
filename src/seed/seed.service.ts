import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { seedData } from './data/seed-data';
import { CreateProductDto } from 'src/products/dtos';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async populateDB() {
    await this.populateProducts();
    return 'The database was populated with the seed successfully';
  }

  async populateProducts() {
    await this.productsService.deleteAll();
    const seedDataProducts = <CreateProductDto[]>seedData.products;
    const promises = seedDataProducts.map(async (prod) => {
      await this.productsService.create(prod);
    });
    await Promise.all(promises);
  }
}

import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { seedData } from './data/seed-data';
import { CreateProductDto } from 'src/products/dtos';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async populateDB(user: User) {
    await this.populateProducts(user);
    return 'The database was populated with the seed successfully';
  }

  async populateProducts(user: User) {
    await this.productsService.deleteAll();
    const seedDataProducts = <CreateProductDto[]>seedData.products;
    const promises = seedDataProducts.map(async (prod) => {
      await this.productsService.create(prod, user);
    });
    await Promise.all(promises);
  }
}

import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AppConfig } from 'src/config/app.config';
import { HandleDbException } from 'src/common/exceptions/handle-db.exception';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImagesRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
    private handleDbException: HandleDbException
  ) {}

  private readonly defaultPage = AppConfig().defaultPage;
  private readonly defaultOffset = AppConfig().defaultOffset;

  async create(createProductDto: CreateProductDto) {
    try {
      const { images, ...partialCreateProductDto } = createProductDto;
      const newProduct = this.productsRepository.create({
        ...partialCreateProductDto,
        ...(images && { images: images.map((image) => this.productImagesRepository.create({ url: image })) })
      });
      const createdProduct = await this.productsRepository.save(newProduct);
      return createdProduct;
    } catch (error) {
      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const page = paginationDto.page || this.defaultPage;
    const offset = paginationDto.offset || this.defaultOffset;
    try {
      const products = await this.productsRepository.find({
        skip: (page - 1) * offset,
        take: offset
      });
      return products;
    } catch (error) {
      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }

  async findOne(id: string) {
    const productFinded = await this.productsRepository.findOne({ where: { id }, relations: ['images'] });
    if (!productFinded) {
      throw new HttpException(
        { internal_code: 'product_not_found', message: 'Product not Found' },
        HttpStatus.NOT_FOUND
      );
    }
    return productFinded;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...partialUpdateProductDto } = updateProductDto;
    const productFinded = await this.findOne(id);

    // Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });
      }
      Object.assign(productFinded, {
        ...partialUpdateProductDto,
        ...(images && { images: images.map((image) => this.productImagesRepository.create({ url: image })) })
      });
      await queryRunner.manager.save(productFinded);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // const productUpdated = await this.productsRepository.save(productFinded);
      return productFinded;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.productsRepository.delete(id);
    } catch (error) {
      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }

  async deleteAll() {
    const query = this.productsRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { Auth, AuthUser } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';
import { User } from 'src/users/entities/user.entity';
import { Product } from './entities';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(validRoles.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Product was created', type: Product })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error' })
  create(@Body() createProductDto: CreateProductDto, @AuthUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @Auth(validRoles.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: 'Products list', type: [Product] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(validRoles.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: 'Product data', type: Product })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: uuid()
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Auth(validRoles.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: 'Product data', type: Product })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: uuid()
  })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto, @AuthUser() user: User) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth(validRoles.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Product data' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: uuid()
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}

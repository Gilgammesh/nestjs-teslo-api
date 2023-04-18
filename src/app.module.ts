import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './config/app.config';
import { AppValidationSchema } from './config/app.validation';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      validationSchema: AppValidationSchema
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: AppConfig().dbPostgresHost,
      port: AppConfig().dbPostgresPort,
      database: AppConfig().dbPostgresName,
      username: AppConfig().dbPostgresUser,
      password: AppConfig().dbpostgresPassword,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductsModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

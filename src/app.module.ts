import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppConfig } from './config/app.config';
import { AppValidationSchema } from './config/app.validation';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './sockets/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      validationSchema: AppValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: AppConfig().dbPostgresHost,
          port: AppConfig().dbPostgresPort,
          database: AppConfig().dbPostgresName,
          username: AppConfig().dbPostgresUser,
          password: AppConfig().dbpostgresPassword,
          autoLoadEntities: true,
          synchronize: true
        };
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule,
    AuthModule,
    UsersModule,
    MessagesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

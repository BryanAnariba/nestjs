import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';
import { CommonModule } from './common/common.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: envs.database,
      autoLoadEntities: true,
      synchronize: true,
      logging: ['query', 'error'],
    }),
    CommonModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

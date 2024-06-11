import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    BooksModule, 
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { handleErrorException } from 'src/core/exceptions';
import { SearchBookByDto } from './dto';
import { SearchBook } from './interfaces';

@Injectable()
export class BookService {

  constructor (
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const newBook = await this.bookModel.create(createBookDto);
      return newBook.save();
    } catch (error) {
      handleErrorException(error);
    }
  }

  async findAll(searchBookByDto: SearchBookByDto): Promise<{totalRecords: number, data: Book[]}> {
    try {
      let searchBook: SearchBook = {};
      if (searchBookByDto.title) {
        searchBook.title = { $regex: '.*' + searchBookByDto.title + '.*', $options: 'i' };
      }
      if (searchBookByDto.description) {
        searchBook.description = { $regex: '.*' + searchBookByDto.description + '.*', $options: 'i' };
      }
      if (searchBookByDto.is_active) {
        searchBook.is_active = (searchBookByDto.is_active === 'true') ? true : false;
      }
      console.log(searchBook)
      const [data, totalRecords] = await Promise.all([
        this.bookModel.find({
          ...searchBook,
        }),
        this.bookModel.countDocuments({
          ...searchBook,
        }),
      ]);
      return {
        totalRecords: totalRecords,
        data: data,
      };
    } catch (error) {
      handleErrorException(error);
    }
  }

  async findOne(id: number) {
    try {

    } catch (error) {
      handleErrorException(error);
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {

    } catch (error) {
      handleErrorException(error);
    }
  }

  async remove(id: number) {
    try {

    } catch (error) {
      handleErrorException(error);
    }
  }
}


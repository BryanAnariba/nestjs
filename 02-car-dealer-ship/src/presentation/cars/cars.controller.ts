import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

  constructor (private readonly carsService: CarsService) {}

  @Get()
  getAllCars () {
    return this.carsService.findAll;
  }

  @Get(':carId')
  getCarById (@Param('carId', ParseIntPipe) carId: number) {
    return this.carsService.finOneById(carId);
  }

  @Post()
  createCar (@Body() body: any) {
    return body;
  }


  @Patch(':carId')
  updateCar (
    @Param('carId', ParseIntPipe) carId: number, 
    @Body() body: any
  ) {
    return {body, carId};
  }

  @Delete(':carId')
  deleteCar (@Param('carId', ParseIntPipe) carId: number) {
    return {carId};
  }

}

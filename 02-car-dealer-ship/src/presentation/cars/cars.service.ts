import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces';

@Injectable()
export class CarsService {

  private cars: Car[] = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla'
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic'
    },
    {
      id: 3,
      brand: 'Toyota',
      model: 'Hilux'
    },
  ];

  public finOneById (carId: number): Car {
    const car = this.cars.find(car => car.id === carId);
    if (!car) throw new NotFoundException(`Car with id ${carId} not found!`);
    return car;
  }

  public get findAll () {
    return this.cars;
  }

  public create () {
    
  }

  public update () {
    
  }

  public delete () {
    
  }
}

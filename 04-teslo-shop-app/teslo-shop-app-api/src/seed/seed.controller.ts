import { Controller, Get} from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seeds')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get("products")
  runProductsSeed () {
    return this.seedService.runProductSeed();
  }
}

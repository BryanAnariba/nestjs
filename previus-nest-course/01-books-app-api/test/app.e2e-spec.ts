import { Test } from '@nestjs/testing';
import { AppModule } from '../src/presentation/app.module';

describe('App e2e tests', () => {

  beforeAll(async () => {
    const appModuleReference = await Test.createTestingModule({
      imports: [AppModule],
    })
    .compile();
  });

  it.todo('Should be pass the testing');
});
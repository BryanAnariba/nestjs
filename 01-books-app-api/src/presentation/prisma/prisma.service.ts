import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { envs } from 'src/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor () {
    super({
      datasources: {
        db: {
          url: envs.batabaseUrl,
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
  	  url: 'postgresql://myuser:mypass@postgres_container:5432/mydb?schema=public'
	},

      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
	constructor(config: ConfigService) {
		super({
			datasources: {
				db: {
					url: config.get('DATABASE_URL')
				},

			},
		});
	}
}
//url: 'postgresql://myuser:mypass@postgres_container:5432/mydb?schema=public'

// EXEMPLE FROM PRISMA WEBSITE FOR NESTJS
//export class PrismaService extends PrismaClient
//  implements OnModuleInit {
//
//  async onModuleInit() {
//    await this.$connect();
//  }
//}

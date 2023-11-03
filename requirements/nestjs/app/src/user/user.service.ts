import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async findOneById(id: number) {
		return this.prisma.user.findUnique({ where: { id: id } });
	}

	//REMPLACER
	async findOneByUsername(username: string) {
		return this.prisma.user.findUnique({ where: { username: username } });
	}
}

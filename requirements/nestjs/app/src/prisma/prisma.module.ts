import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//Global permet de rendre la classe PrismaModule accessible a tous les autres modules sans avoir a l'importer dans les modules un par un
@Global()
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}

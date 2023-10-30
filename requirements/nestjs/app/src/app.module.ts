import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestModule } from './request/request.module';
import { JwtStrategy } from './auth/strategy';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/strategy/jwt.global';

@Module({
	imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule, PrismaModule, RequestModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}


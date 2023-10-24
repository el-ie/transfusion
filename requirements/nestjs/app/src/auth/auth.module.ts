import { Module } from "@nestjs/common";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

import { FortyTwoStrategy } from './strategy/42.strategy';
//import { PassportModule } from '@nestjs/passport';

import { UserModule } from "src/user/user.module";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

@Module({
	imports: [JwtModule.register({}), UserModule],
	//imports: [PassportModule.register({ defaultStrategy: '42' }), JwtModule.register({})], //useless ?
	controllers: [AuthController],
	// je rajoute PrismaService dans provider mais bizarre que ca marche sans
	providers: [AuthService, JwtStrategy, FortyTwoStrategy, PrismaService, UserService],
	exports: [AuthService, JwtStrategy],
})
export class AuthModule {}

import { Module } from "@nestjs/common";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

import { FortyTwoStrategy } from './strategy/42.strategy';
//import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [JwtModule.register({})],
	//imports: [PassportModule.register({ defaultStrategy: '42' }), JwtModule.register({})], //useless ?
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, FortyTwoStrategy],
	exports: [AuthService, JwtStrategy],
})
export class AuthModule {}

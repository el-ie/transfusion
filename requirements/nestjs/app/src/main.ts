import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

//import * as passport from 'passport';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.useGlobalPipes(new ValidationPipe( { whitelist: true }));
	app.use(cookieParser());
	app.enableCors();
	//app.use(passport.initialize());
	await app.listen(3001);
}
bootstrap();

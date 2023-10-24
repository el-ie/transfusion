import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

//import * as passport from 'passport';

async function bootstrap() {
	//const app = await NestFactory.create(AppModule, { cors: true });
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe( { whitelist: true }));
	app.use(cookieParser());
	//app.enableCors();
	app.enableCors({
    origin: 'http://localhost:3000',  // remplacez par l'URL de votre application React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
	//app.use(passport.initialize());
	await app.listen(3001);
}
bootstrap();

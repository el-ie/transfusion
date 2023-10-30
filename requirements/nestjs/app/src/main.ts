import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { UseGuards, ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/strategy/jwt.global';

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

  const reflect = app.get(Reflector);
	app.useGlobalGuards(new JwtAuthGuard(reflect));

	//app.use(passport.initialize());
	await app.listen(3001);
}
bootstrap();

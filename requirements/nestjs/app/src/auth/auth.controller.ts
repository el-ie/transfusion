import { Controller, Post, Get, Body, Req, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { AuthDto } from './dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController{
	constructor(private authService: AuthService) {}

	@Get('login42')
	@UseGuards(AuthGuard('42'))
	foooo() {}

	@Get('42/callback')
	@UseGuards(AuthGuard('42'))
	bar(@Req() req) {
		console.log('controller: callback');
		//console.log(req);
		return;
	}

	@Post('signup')
	signup(@Body() dto: AuthDto) {
		//signup(@Req() req: Request) {
		console.log( {dto} );
		return this.authService.signup(dto);
		}

		@Post('signup_other')
		signup_other(@Body('email') email: string, @Body('password') password: string ) {
			console.log("On recupere email [" + email + "] et password [" + password + "]");
			return 'Hello ceci est exemple de comment faire sans dto';
		}

		@Post('signin')
		signin(@Body() dto: AuthDto) {
			return this.authService.signin(dto);
		}

	}

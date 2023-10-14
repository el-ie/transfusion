import { Controller, Post, Get, Body, Req, UseGuards, Param, Res } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { AuthDto } from './dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController{
	constructor(private authService: AuthService) {}

	/////////////////////////////////////////////////////
	////////////////// TEST JWT TOKEN ///////////////////

	@Get('get_token_cookie')
	async getTokenCookie(@Res() response) {

		const token = await this.authService.testGetToken('test');
		//console.log('@Get[get_token_cookie] -> [', token, ']');
		response.cookie('AUTH_TOKEN', token, { httpOnly: true });
		return response.send();//options?
	}

	@Get('check_cookie')
	async doSomething(@Req() request: any) {

		const token = request.cookies['AUTH_TOKEN'];
		//console.log('@Get[check_cookie] -> [', token, ']');
		if (!token)
			return ("Le token n'etait pas disponible dans les cookies");

		const result = await this.authService.testValidateToken(token);
		if (!result)
			return('[ECHEC] Le token du cookie est invalide');
		return '[SUCCES] le token JWT du cookie authentifie l utilisateur';
	}

	//useless (testing purpose)
	//@Get('get_raw_token')
	//async testGetToken() {
	//	const token = await this.authService.testGetToken('test');
	//	console.log('@Get[get_raw_token] -> [', token, ']');
	//	return this.authService.testGetToken('test');
	//}

	////////////////////  END TEST  /////////////////////
	/////////////////////////////////////////////////////


	/////////////////////////////////////////////////////
	////////////////////  CALL API  /////////////////////

	//LAUNCH API 42 auth
	@Get('login42')
	@UseGuards(AuthGuard('42'))
	foooo() {
		// N EST PAS APPELLE
		console.log('impossible');
		return;
	}

	//callback from api
	@Get('42/callback')
	@UseGuards(AuthGuard('42'))
	bar(@Req() req) {
		console.log('controller: callback');
		//console.log(req);
		return;
	}

	/////////////////// END CALL API ////////////////////
	/////////////////////////////////////////////////////


	/////////////////// OLD AUTH (TUTO) /////////////////
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
	//////////////// END OLD AUTH (TUTO) ////////////////
	/////////////////////////////////////////////////////

	}

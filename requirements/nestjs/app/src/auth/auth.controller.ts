import { Controller, Get, Req, UseGuards, Res, HttpStatus, HttpException, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { Public } from "src/decorators/public.decorator";

import { toDataURL } from "qrcode";

@Controller('auth')
export class AuthController{
	constructor(private authService: AuthService) {}

	@Get('2fa_getqr')
	async getqr(@Res() response, @Req() request) {

		//console.log('--------------twofa--------------');
		const { otpAuthUrl } = await this.authService.launchTwoFa(request.user);
		const result = await toDataURL(otpAuthUrl);

		return (response.json(result));
	}

	@Post('2fa_activate')
	async turnOnTwoFactorAuthentication(@Req() request, @Body() body) {

		console.log('-----------2fa activate ------------');
		//console.log('body: ', body);
		console.log('request.user: ', request.user);
		console.log('body.twoFactorCode: ', body.twoFactorCode);
		console.log('___________________________________');

		const isCodeValid =
			this.authService.verifyTwoFa(
				request.user,
				body.twoFactorCode,
		);

		if (!isCodeValid) {
			throw new HttpException('[auth.controller] [2fa activate]: mauvais code', HttpStatus.UNAUTHORIZED);
		}

		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
		console.log('[2fa - activate] valide !!');
		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

		//await this.usersService.turnOnTwoFactorAuthentication(request.user.userId);
		//await this.usersService.turnOnTwoFactorAuthentication(request.user.id);

	}


	//	@UseGuards(AuthGuard('jwt')) //il a ete active de maniere globale
	@Get('check_auth_token')
	check_succes() {
		return 'success';
	}

	/* CALL API Le decorateur Public est necessaire pour que la route puisse etre accessible sans passer par le guard jwt puisque l'utilisateur n'est pas encore authentifie */
		@Public()
	@UseGuards(AuthGuard('42strat'))
	@Get('login42')
	shouldnt_be_called() {
		throw new HttpException('[auth.controller] [login42]: le handler de la route login42 ne devrait pas etre appelle', HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// CALLBACK API
	@Public()
	@UseGuards(AuthGuard('42strat'))
	@Get('42/callback')
	async bar(@Req() req, @Res() response) {

		// creation du tokenJWT avec le username, est ce une bonne pratique ?
		const token = await this.authService.generateJwt(req.user);
		//console.log('@Get[get_token_cookie] -> [', token, ']');

		response.cookie('AUTH_TOKEN', token, { httpOnly: false });

		//return response.send();//options?
		response.redirect('http://localhost:3000/homepage');
	}

		//////////////////////////////////////////////////////////
		// Cette route est appelle par le module RouteProtection dans react avec axios pour proteger les routes dans le front
		// FINALEMENT c est le role du JWT guard de faire ca
		//@Get('check_auth_token')
		//async verification(@Req() request: any) {
		//
		//	const token = request.cookies['AUTH_TOKEN'];
		//
		//	if (!token)
		//		throw new HttpException('[auth.controller] [check_auth_token]: pas de AUTH_TOKEN', HttpStatus.UNAUTHORIZED);
		//
		//	try {
		//		await this.authService.testValidateToken(token);
		//		return 'success';
		//	}
		//	catch (err) {
		//		throw new HttpException('[auth.controller] [check_auth_token]: testValidateToken mauvais retour', HttpStatus.UNAUTHORIZED);
		//	}
		//}
		/////////////////////////////////////////////////////
		////////////////// Routes pour tests ////////////////
		//@Get('get_token_cookie')
		//async getTokenCookie(@Res() response) {
		//	const token = await this.authService.generateJwt('test');
		//	response.cookie('AUTH_TOKEN', token, { httpOnly: false });
		//	return response.send();//options?
		//}
		//@Get('check_cookie')
		//async checkTheCookie(@Req() request: any) {
		//	const token = request.cookies['AUTH_TOKEN'];
		//	if (!token)
		//		return ("Le token n'etait pas disponible dans les cookies");
		//	const result = await this.authService.testValidateToken(token);
		//	return '[SUCCES] le token JWT du cookie authentifie l utilisateur';
		//}
		////////////////////  END TEST  /////////////////////
		/////////////////////////////////////////////////////
}

import { Controller, Get, Req, UseGuards, Res, HttpStatus, HttpException, Post, Body, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { Public } from "src/decorators/public.decorator";

import { toDataURL } from "qrcode";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('auth')
export class AuthController{
	constructor(private authService: AuthService, private prisma: PrismaService) {}

	@Get('2fa_getqr')
	async getqr(@Res() response, @Req() request) {

		//console.log('--------------twofa--------------');
		const { otpAuthUrl } = await this.authService.launchTwoFa(request.user);
		const result = await toDataURL(otpAuthUrl);

		return (response.json(result));
	}

	@Post('2fa_activate') async turnOnTwoFactorAuthentication(@Req() request, @Body() body, @Res() response) {

		console.log('-----------2fa activation ------------');

		const isCodeValid =
			await this.authService.activateTwoFa(
				request.user,
				body.twoFactorCode,
		);

		if (!isCodeValid) {
			throw new HttpException('[auth.controller] [2fa activate]: mauvais code', HttpStatus.UNAUTHORIZED);
		}
		console.log('[2fa - activate] valide ');

		const token = await this.authService.generateJwt(request.user);
	
		response.cookie('2FA_TOKEN', token, { httpOnly: false });

		//response.redirect('http://localhost:3000/login');
		response.send(); //code http ? options ?
		//le @HttpCode(200) enverra la reponse correcte
	}

	//Route pour le developpement
	@Get('check_2fa_activation')
	@HttpCode(200)
	async check_2fa_activation(@Req() request) {

		const currentUser = await this.prisma.user.findUnique({
			where: { username: request.user.username },
		});

		if (!currentUser.twoFaEnabled)
			throw new HttpException('[auth.controller] [check_2fa_validation]: 2FA INACTIF', HttpStatus.UNAUTHORIZED);
	}

	@Get('check_is_signed')
	@HttpCode(200)
	checkIsSigned() {
	}


	// cette route permet a RouteProtection de react de verifier si l utilisateur a bien son cookie
	// jwt apour proteger les routes
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
		response.redirect('http://localhost:3000/login');
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

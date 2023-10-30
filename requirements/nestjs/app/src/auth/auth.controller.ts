import { Controller, Get, Req, UseGuards, Res, HttpStatus, HttpException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController{
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard('jwt'))
	@Get('check_auth_token')
	check_succes() {
		return 'success';
	}

	// CALL API
	@UseGuards(AuthGuard('42strat'))
	@Get('login42')
	shouldnt_be_called() {
		throw new HttpException('[auth.controller] [login42]: le handler de la route login42 ne devrait pas etre appelle', HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// CALLBACK API
	@UseGuards(AuthGuard('42strat'))
	@Get('42/callback')
	async bar(@Req() req, @Res() response) {

		console.log('=========== passage =========');
		console.log('ON A : ', req);
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

import { Controller, Get, Req, UseGuards, Res, HttpStatus, HttpException, Post, Body, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { Public } from "src/decorators/public.decorator";

import { toDataURL } from "qrcode";
import { PrismaService } from "src/prisma/prisma.service";
import { AvoidTwoFa } from "src/decorators/avoidtwofa.decorator";

@Controller('auth')
export class AuthController{
	constructor(private authService: AuthService, private prisma: PrismaService) {}

	//////////////// ROUTES AUTHENTIFICATION API 42 ////////////////
	// ces routes permettent de declencher l authentification basique a l aide de l api de 42

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
		const token = await this.authService.generateJwt(req.user, 'basic_auth');
		//console.log('@Get[get_token_cookie] -> [', token, ']');

		response.cookie('AUTH_TOKEN', token, { httpOnly: false });

		//return response.send();//options?
		response.redirect('http://localhost:3000/login');
	}

		//////////////// ROUTES AUTHENTIFICATION 2FA ////////////////

		//@AvoidTwoFa() //normalement twoFaEnabled est a false a ce stade donc le guard 2fa ne devrait pas etre un soucis
		//ici le twoFaSecret du user est change donc il ne faut lancer la route que a l activation
		@Get('2fa_getqr')
		async getqr(@Res() response, @Req() request) {

			//console.log('--------------twofa--------------');
			const { otpAuthUrl, secret } = await this.authService.launchTwoFa(request.user);
			const result = await toDataURL(otpAuthUrl);

			//changement du secret
			const updatedUser = await this.prisma.user.update({
				where: { username: request.user.username },
				data: { twoFaSecret: secret }
			});

			return (response.json(result));
		}

		//@AvoidTwoFa()
		@Post('2fa_activate') 
		async turnOnTwoFactorAuthentication(@Req() request, @Body() body, @Res() response) {

			console.log('-----------2fa activation ------------');

			//Attention changement de nom twoFaActivate
			const isCodeValid =
				await this.authService.twoFaActivate(
					request.user,
					body.twoFactorCode,
			);

			if (!isCodeValid) {
				throw new HttpException('[auth.controller] [2fa activate]: mauvais code', HttpStatus.UNAUTHORIZED);
			}

			await this.prisma.user.update({
				where: { username: request.user.username },
				data: { twoFaEnabled: true }
			});

			console.log('[2fa - activate] valide ');

			const token = await this.authService.generateJwt(request.user, 'twofa');

			response.cookie('TWOFA_TOKEN', token, { httpOnly: false });
			//response.redirect('http://localhost:3000/login');
			response.send(); //code http ? options ?
				//le @HttpCode(200) enverra la reponse correcte
		}


			//to get the TWOFA_TOKEN cookie quand la 2fa a deja ete activee sur le compte et que l utilisateur se reconnecte
			@AvoidTwoFa()
			@Post('2fa_authenticate') 
			async twoFaAuthentication(@Req() request, @Body() body, @Res() response) {

				console.log('-----------2fa activation ------------');

				const isCodeValid =
					await this.authService.twoFaAuthenticate(
						request.user,
						body.twoFactorCode,
				);

				if (!isCodeValid) {
					throw new HttpException('[auth.controller] [2fa activate]: mauvais code', HttpStatus.UNAUTHORIZED);
				}
				console.log('[2fa - authenticate] valide ');

				const token = await this.authService.generateJwt(request.user, 'twofa');

				response.cookie('TWOFA_TOKEN', token, { httpOnly: false });
				//response.redirect('http://localhost:3000/login');
				response.send(); //code http ? options ?
					//le @HttpCode(200) enverra la reponse correcte
			}


				////////////////	ROUTES FOR REACT CHECK ////////////////

				@Get ('simple_get')
				just_a_simple_get() {
				}

				//@UseGuards(AuthGuard('jwt-twofa')) //active globalement
				//@HttpCode(200)
				@Get ('check_2fa_cookie')
				check_twofa_cookie(@Req() req) {

					if (!req.cookies.TWOFA_TOKEN)
						throw new HttpException('[auth.controller] [check_2fa_cookie]: pas de TWOFA cookie', HttpStatus.UNAUTHORIZED);
					//succes du guard
				}

				// route pour React pour l affichage de l etat de l activation 2FA
				//@AvoidTwoFa() fewhoi

				@AvoidTwoFa()
				@Get('check_2fa_activation')
				@HttpCode(200) // est ce ok comme ca
				async check_2fa_activation(@Req() request) {

					const currentUser = await this.prisma.user.findUnique({
						where: { username: request.user.username },
					});

					if (!currentUser.twoFaEnabled)
						throw new HttpException('[auth.controller] [check_2fa_validation]: 2FA INACTIF', HttpStatus.UNAUTHORIZED);
				}

				//check for basic auth
				@AvoidTwoFa()
			@Get('check_is_signed')
			@HttpCode(200)
			checkIsSigned() {
			}

			// cette route permet a RouteProtection de react de verifier si l utilisateur a bien son cookie
			// jwt apour proteger les routes
			//	@UseGuards(AuthGuard('jwt')) //il a ete active de maniere globale
				@AvoidTwoFa()
			@Get('check_auth_token')
			check_succes() {
				return 'success';
			}
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

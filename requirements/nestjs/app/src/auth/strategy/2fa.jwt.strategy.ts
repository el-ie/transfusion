import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TwoFaJwtStrategy extends PassportStrategy(Strategy, 'jwt-twofa') {
	constructor(config: ConfigService, private readonly user: UserService) {
		super({
			// recuperation du cookie est elle ok ?
			jwtFromRequest: (req) => {
				//console.log('ON a req.cookies.AUTH_TOKEN = [', req.cookies.AUTH_TOKEN);
				if (req.cookies.TWOFA_TOKEN)
					return req.cookies.TWOFA_TOKEN.access_token;
				else
					throw new HttpException('2fa jwt strategy: pas de TWOFA_TOKEN', HttpStatus.UNAUTHORIZED);
			},
			secretOrKey: config.get('JWT_SECRET'), 
		}
			 );
	}

	async validate(payload: any) {

		//console.log('--- jwt callback ---');
			console.log('$$$ jwt-twofa strategie $$$');

		if (!payload.username)
					throw new HttpException('2fa.jwt strategy callback: pas username dans le token', HttpStatus.UNAUTHORIZED);

		const utilisateur = await this.user.findOneByUsername(payload.username);

		// checker cette verification
		if (!utilisateur)
					throw new HttpException('2fa.jwt strategy callback: l utilisateur n existe pas dans la database.', HttpStatus.UNAUTHORIZED);
			// Remettre une bonne erreur //throw new UnauthorizedException();
		
		if (utilisateur.sessionId != payload.sessionId)
					throw new HttpException('2fa.jwt strategy callback: Bad sessionId', HttpStatus.UNAUTHORIZED);

				return true;
		// return utilisateur;
		// je pense que c est le role du guard jwt simple de retourner l utilisateur
	}
}

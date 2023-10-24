import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(config: ConfigService, private readonly user: UserService) {
		super({
			// recuperation du cookie est elle ok ?
			jwtFromRequest: (req) => {
				//console.log('ON a req.cookies.AUTH_TOKEN = [', req.cookies.AUTH_TOKEN);
				if (req.cookies.AUTH_TOKEN)
					return req.cookies.AUTH_TOKEN.access_token;
				else
					throw new Error('JWT STRATEGY : cookie absent');
			},
			secretOrKey: config.get('JWT_SECRET'), 
		}
			 );
	}

	async validate(payload: any) {

		console.log('--- jwt callback ---');

		console.log(payload);

		if (!payload.username)
			throw new Error('[validate] payload.username not found');

		const utilisateur = await this.user.findOneByUsername(payload.username);

		// checker cette verification
		if (!utilisateur)
			throw new Error('USER NOT IN DATABASE (validate)');
			// Remettre une bonne erreur //throw new UnauthorizedException();

		console.log('utilisateur :');
		console.log(utilisateur);

		return utilisateur;
	}
}

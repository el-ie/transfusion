import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(config: ConfigService) {
		super({
			// recuperation du cookie un peu bancale ?
			jwtFromRequest: (req) => {
				if (req.cookies['AUTH_TOKEN'])
					return req.cookies.AUTH_TOKEN.access_token;
				else
					return "";
			},
			secretOrKey: config.get('JWT_SECRET'), 
		}
			 );
	}

	async validate(payload: any) {
		console.log('JWT STRATEGY VALIDATIONNNNN');
		return { username: payload.username };
	}
}

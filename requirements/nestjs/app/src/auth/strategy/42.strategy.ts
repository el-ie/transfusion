
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
//import { AuthService } from './auth.service';  // service qui gère l'authentification/logique métier
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42strat') {

	constructor(config: ConfigService, private prisma: PrismaService) {
		super({
			clientID: config.get('UID'),
			clientSecret: config.get('SECRET'),
			callbackURL: "http://localhost:3001/auth/42/callback"
		});
	}

	async validate(accessToken: string, refreshToken: string, profile, cb: Function) {

		console.log('-----------------');
		console.log('APPEL fonction validate : ', profile.name);

		const user = await this.prisma.user.findUnique( { where: { username: profile.username } });

		if (!user) {
			console.log('the user ', profile.username, ' dont exist');
			console.log(' ----- user creation in process -----');

			const user = await this.prisma.user.create({
				data: {
					username: profile.username,
					email: profile.emails[0].value,
				},
			});

			console.log(' ------ user successfully created -----');
			return { username: profile.username, user };

		}
		else {
			console.log(' the user ', profile.username, ' already exist :');
			console.dir(user, { depth: null })

			return { username: profile.username, user };
		}

	}
}

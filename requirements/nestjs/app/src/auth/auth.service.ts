import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as argon from 'argon2';
//pourquoi il y avait argon ?

import { authenticator } from 'otplib';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}


	//to secure
	// Permet a l'utilisateur d'activer la 2FA pour son compte, Tant que l'utilisateur n'a pas valide son code 2FA dans activateTwoFa alors la 2FA sera inactive
	async launchTwoFa(userInfos) {

		//console.log('___launchTwoFa___');
		//console.log('userInfos = ', userInfos);
		const secret = authenticator.generateSecret();
		//utiliser le mail plutot que username pour respecter keyuri ?
		const otpAuthUrl = authenticator.keyuri( userInfos.username, 'TRANSCENDANCE', secret, );
		const updatedUser = await this.prisma.user.update({
			where: { username: userInfos.username },
			data: { twoFaSecret: secret }
		});

		return { otpAuthUrl };
	}

	// Une fois que l utilisateur a demande l'activation de la 2FA cette fonction permettra de lui activer apres qu'il ai entre un code 2FA valide une premiere fois, apres cela il sera oblige d'entrer un code 2FA a chaque fois avant d'acceder a son compte
	async activateTwoFa(user, twoFactorCode: string) {

		console.log('---- verifyTwoFa ----');
		console.log('user.twoFaSecret = ', user.twoFaSecret);

		//await?
		if ( authenticator.verify( { token: twoFactorCode, secret: user.twoFaSecret } ) === false )
		return false;

		await this.prisma.user.update({
			where: { username: user.username },
			data: { twoFaEnabled: true }
		});

		return true;
	}

	// Cette fonction permet a l'utilisateur qui a precedemment active la 2FA sur son compte avec activateTwoFa de lancer une identification 2FA.pour obtenir un cookie
	async twoFaAuthenticate(user, twoFactorCode: string) {

		if ( authenticator.verify( { token: twoFactorCode, secret: user.twoFaSecret } ) === false )
		return false;


		await this.prisma.user.update({
			where: { username: user.username },
			data: { twoFaEnabled: true }
		});

		return true;

	}



	async generateJwt(user) : Promise< {access_token: string} >{

		const payload = {
			id: user.id,
			sessionId: user.sessionId,
			username: user.username,
			//ajouter des informations ?
		};

		const secret = this.config.get('JWT_SECRET');

		//const token = await this.jwt.signAsync(payload, { expiresIn: '15m', secret: secret });
		try {
			const token = await this.jwt.signAsync(payload, { secret: secret });
			return { access_token: token };

		} catch (err){
			throw new HttpException('[auth.service] [generateJwt] : jwt.signAsync : error catched', HttpStatus.INTERNAL_SERVER_ERROR);
			//est ce que signAsync peut throw une erreur
		}
	}

	//async testValidateToken(token_to_test) {
	//
	//	//il y a aussi le sessionId a checker
	//
	//	const secret = this.config.get('JWT_SECRET');
	//
	//	try {
	//		// peut on faire comme ca sans assignation
	//		await this.jwt.verifyAsync(token_to_test.access_token, { secret: secret } );
	//	} catch (err) {
	//			throw new HttpException('[auth.service] [testValidateToken] : jwt.verifyAsync : error catched', HttpStatus.UNAUTHORIZED);
	//	}
	//}	

}

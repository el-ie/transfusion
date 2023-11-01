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

	verifyTwoFa(user, twoFactorCode: string) {

		console.log('---- verifyTwoFa ----');
		console.log('user.twoFaSecret = ', user.twoFaSecret);

		return authenticator.verify({
			token: twoFactorCode,
			secret: user.twoFaSecret,
		});
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

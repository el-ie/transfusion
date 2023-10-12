import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { AuthDto } from './dto'

import * as argon from 'argon2';

import { Prisma } from '@prisma/client';

import { ForbiddenException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';

import { FortyTwoStrategy } from './strategy/42.strategy';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService, private fourtytwo: FortyTwoStrategy) {}

	///////////////////test////////////////////////
	//async fourtyup(dto: AuthDto) {
	//	this.fourtytwo.hellofrom();
	//	return 'test';
	//}
	//////////////////////////////////////////

	async signup(dto: AuthDto) {

		const hash = await argon.hash(dto.password);	

		//save the new user in the db
		try {
			const user =  await this.prisma.user.create({ data: { email: dto.email, hash, }, });
			return this.signToken(user.id, user.email);

		} catch(error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Credentials taken');
				}
			}
			throw error;
		}
	}
	// select allow choosing what to send back //select: { id: true, email: true, createdAt: true, }, //delete user.hash; //eviter de renvoyer le hash dans la requete de reponse a post
	/////////////////////////////////////


	async signin(dto: AuthDto) {

		//find user by email
		const user = await this.prisma.user.findUnique( { where: { email: dto.email } });

		//iff user dont exist throw exception
		if (!user)
			throw new ForbiddenException('Credentials incorrect');

		//compare password
		const pwMatches = await argon.verify(user.hash, dto.password);

		//iff incorrect throw exception
		if (!pwMatches)
			throw new ForbiddenException('Credentials incorrect');

		//delete user.hash
		console.log('LOGIN SUCESSFULL');
		return this.signToken(user.id, user.email);

	}

	async signToken(userId: number, email: string) : Promise< {access_token: string} >{

		const payload = {
			sub: userId,
			email
		};

		const secret = this.config.get('JWT_SECRET');

		const token = await this.jwt.signAsync(payload, { expiresIn: '15m', secret: secret });

		return { access_token: token };
	}
	///////////////////////////////////////
}

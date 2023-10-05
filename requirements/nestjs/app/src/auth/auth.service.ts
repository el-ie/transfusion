import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { AuthDto } from './dto'

import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

	async signup(dto: AuthDto) {
	//generate the password hash
	const hash = await argon.hash(dto.password);	
	//save the new user in the db
	const user =  await this.prisma.user.create({
		data: {
		  email: dto.email,
		  hash,
		},

		// select allow choosing what to send back
		//select: { id: true, email: true, createdAt: true, },
	});
		
	delete user.hash; //eviter de renvoyer le hash dans la requete de reponse a post
	
	//return the saved user
	return user;
	}

	signin() {
		return { msg: 'I HAVE SIGNIN' };
	}
}

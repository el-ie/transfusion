import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { AuthDto } from './dto'

import * as argon from 'argon2';

import { Prisma } from '@prisma/client';

import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

	async signup(dto: AuthDto) {
	//generate the password hash
	const hash = await argon.hash(dto.password);	

	//save the new user in the db
		
        try {
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
	} catch(error) {
	  if (error instanceof Prisma.PrismaClientKnownRequestError) {
	    if (error.code === 'P2002') {
	      throw new ForbiddenException('Credentials taken');
	    }
	  }
	  throw error;
	}

	}


	async signin(dto: AuthDto) {

		//find user by email
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email }
		});
		
		//if user dont exist throw excception
		if (!user)
			throw new ForbiddenException('Credentials incorrect');
		
		//compare password
		const pwMatches = await argon.verify(user.hash, dto.password);

		//if incorrect throw exception
		if (!pwMatches)
			throw new ForbiddenException('Credentials incorrect');

		delete user.hash;

		return user;
	}
}


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

  //hellofrom() {
	 // console.log('HHHELLLLLOOOO');
	 // return;
  //}

  async validate(accessToken: string, refreshToken: string, profile, cb: Function) {

	  //var test = await this.authService.validateUserByFortyTwo(profile);
	  console.log('-----------------');
	  //console.log(profile.name);
	  //   return done(null, user);
	  console.log('APPEL fonction validate : ', profile.name);

	  const all = await this.prisma.user.findMany();
	  console.log('---------------');
	  console.log(' VOICI LA LISTE DES User :')
	  console.log(all);
	  //console.dir(all, { depth: null })
	  console.log('---------------');



	  

	  return 'random text';
  }
}

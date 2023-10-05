import { Controller, Post, Req, Body } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { Request } from 'express';

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: any) {
  //signup(@Req() req: Request) {
    //console.log(req);
    console.log( {dto} );

    return this.authService.signup();
    //return 'I AM SIGNED UPPP';
  }

  @Post('signin')
  signin() {

    return this.authService.signin();
    //return 'I AM SIGNED INNN';
  }

  @Post('testobject')
  testobject() {
    return { msg: 'lalalou' };
  }
}

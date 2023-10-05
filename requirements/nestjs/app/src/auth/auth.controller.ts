import { Controller, Post, Body } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { AuthDto } from './dto'

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
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

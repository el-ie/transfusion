import { Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    //return 'I AM SIGNED UPPP';
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    //return 'I AM SIGNED INNN';
    return this.authService.signin();
  }

  @Post('testobject')
  testobject() {
    return { msg: 'lalalou' };
  }
}

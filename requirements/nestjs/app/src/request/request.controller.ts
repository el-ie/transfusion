import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  //route hyper simple pour petit test avec axios
 
 @UseGuards(AuthGuard('jwt'))
  @Get('get_all')
	get_all(@Req() req) {

		return req.user;
	}

 @UseGuards(AuthGuard('jwt'))
  @Get('get_username')
	get_username(@Req() req) {

		return req.user.username;
	}

 @UseGuards(AuthGuard('jwt'))
  @Get('get_id')
	get_id(@Req() req) {

		return req.user.id;
	}


}

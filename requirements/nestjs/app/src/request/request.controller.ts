import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  //route hyper simple pour petit test avec axios
 
 @UseGuards(AuthGuard('jwt'))
  @Get('test_string')
	test_basique(@Req() req) {

		return req.user;
	}

  @UseGuards(AuthGuard('jwt'))
  @Get('test_more')
	test_more(@Req() req) {
		//return req.user;
		console.log('TYPE OF REQ USER = ', typeof(req.user));

		//return req.user;
		return { testnom: 'bobby' };
	}


}

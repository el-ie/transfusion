import { Controller, Get, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  //route hyper simple pour petit test avec axios
 
  @UseGuards(AuthGuard('jwt'))
  @Get('test1')
	foo() {
		return 'succes du test1 from nestjs';
	}

}

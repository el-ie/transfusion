import { Controller, Get } from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  //route hyper simple pour petit test avec axios
  @Get('test1')
	foo() {
		return 'succes du test1 from nestjs';
	}
}

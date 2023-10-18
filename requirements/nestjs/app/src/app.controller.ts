import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return "Bienvenue a l'accueil (from app controller) " ;
		//return this.appService.getHello();
	}
}

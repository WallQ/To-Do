import {
	Controller,
	Post,
	Get,
	Body,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO, signInDTO } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('sign-up')
	signUp(@Body() dto: signUpDTO) {
		return this.authService.signUp(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	signIn(@Body() dto: signInDTO) {
		return this.authService.signIn(dto);
	}

	@Get('sign-out')
	signOut() {
		return this.authService.signOut();
	}
}

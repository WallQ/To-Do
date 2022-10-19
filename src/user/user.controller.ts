import { Controller, UseGuards, Get, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { EditUserDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('me')
	getMe(@GetUser() user: User): User {
		return user;
	}

	@Patch('update')
	updateUser(@GetUser('id') userId: number, @Body() dto: EditUserDTO) {
		return this.userService.updateUser(userId, dto);
	}
}

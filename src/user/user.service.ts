import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDTO } from './dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async updateUser(userId: number, dto: EditUserDTO) {
		try {
			const user = await this.prisma.user.update({
				where: { id: userId },
				data: {
					...dto,
				},
			});
			return { ...user, password: undefined };
		} catch (error) {
			throw error;
		}
	}
}

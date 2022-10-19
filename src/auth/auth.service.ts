import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/';
import { signUpDTO, signInDTO } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	async signToken(userId: number, email: string): Promise<{ token: string }> {
		const payload = {
			userId,
			email,
		};

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '1d',
			secret: this.configService.get('JWT_SECRET'),
		});

		return { token };
	}

	async signUp(dto: signUpDTO) {
		try {
			const hash = await argon.hash(dto.password);
			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					password: hash,
					firstName: dto.firstName,
					lastName: dto.lastName,
				},
			});
			return this.signToken(user.id, user.email);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002')
					throw new ForbiddenException(
						'The email address provided is already in use!',
					);
			}
			throw error;
		}
	}

	async signIn(dto: signInDTO) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					email: dto.email,
				},
			});
			if (!user)
				throw new ForbiddenException(
					"There's no account associated with this email address!",
				);

			const passwordMatch = await argon.verify(
				user.password,
				dto.password,
			);
			if (!passwordMatch) {
				throw new ForbiddenException(
					'The password provided is incorrect!',
				);
			}
			return this.signToken(user.id, user.email);
		} catch (error) {
			throw error;
		}
	}

	signOut() {
		return { msg: 1 };
	}
}

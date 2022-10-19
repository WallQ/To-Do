import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(configService: ConfigService, private prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate(payload: { userId: number; email: string }) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: payload.userId,
				},
			});
			if (!user)
				throw new UnauthorizedException(
					'Your token provided is invalid or has expired!',
				);
			return { ...user, password: undefined };
		} catch (error) {
			throw error;
		}
	}
}

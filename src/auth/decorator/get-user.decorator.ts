import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
	(data: string | undefined, context: ExecutionContext) => {
		const request: Express.Request = context.switchToHttp().getRequest();
		if (data) return (request.user as any)[data];
		return request.user;
	},
);

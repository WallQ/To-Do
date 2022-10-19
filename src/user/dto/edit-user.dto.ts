import { IsOptional, IsEmail, IsString } from 'class-validator';

export class EditUserDTO {
	@IsOptional()
	@IsString()
	@IsEmail()
	email?: string;
	@IsOptional()
	@IsString()
	password?: string;
	@IsOptional()
	@IsString()
	firstName?: string;
	@IsOptional()
	@IsString()
	lastName?: string;
}

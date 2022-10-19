import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class signInDTO {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;
	@IsNotEmpty()
	@IsString()
	password: string;
}

export class signUpDTO {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;
	@IsNotEmpty()
	@IsString()
	password: string;
	@IsNotEmpty()
	@IsString()
	firstName: string;
	@IsNotEmpty()
	@IsString()
	lastName: string;
}

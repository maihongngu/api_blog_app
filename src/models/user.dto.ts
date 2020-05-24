import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator'


export class LoginDTO{
    @IsEmail()
    @IsString()
    @MinLength(4)
    email: string
    
    @IsString()
    @MinLength(8)
    password: string
}

export class RegistrationDTO extends LoginDTO{
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    username: string

}

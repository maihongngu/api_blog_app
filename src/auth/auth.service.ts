import { Injectable, InternalServerErrorException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { LoginDTO, RegistrationDTO } from 'src/models/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor (

        @InjectRepository(UserEntity) private userRepo:
        Repository<UserEntity>,

    ){}

    async register( credentials: RegistrationDTO){
        try {
            const user = this.userRepo.create(credentials)
            await user.save()
        } catch (error) {
            if(error.code === '23505'){
                throw new ConflictException('Username has already taken')
            }
            throw new InternalServerErrorException()
        }
    }
    async login( {email, password}: LoginDTO ){
        try {
            const user = await this.userRepo.findOne({where: {email}})
            if(user && await user.comparePassword(password)){
                return user
            }
            throw new UnauthorizedException('Invalid Credentials')
        } catch (error) {
            throw new UnauthorizedException('Invalid Credentials')
        }
    }

}

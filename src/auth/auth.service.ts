import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginDTO, RegistrationDTO } from 'src/models/user.dto';

@Injectable()
export class AuthService {

    private mockUser = {
        email:"vjpking5913@gmail.com",
        token:'jwt.token',
        username:'eriksyiuh',
        bio:'I love Gia Han',
        image: null
    }

    register( credentials: RegistrationDTO){
        return this.mockUser
    }
    login( credentials: LoginDTO ){
        if(credentials.email === this.mockUser.email){
            return this.mockUser
        }
        throw new InternalServerErrorException()
    }

}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { Model} from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema'
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ){}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = {...userObject, password : plainToHash};
    return this.userModel.create(userObject);
  }

  async login(userObjectLogin: LoginAuthDto){
    const { email, password } = userObjectLogin;
    const findUser = await this.userModel.findOne({ email });
    if(!findUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password,findUser.password);
    if(!checkPassword) throw new HttpException('Password Incorrect', HttpStatus.UNAUTHORIZED);
    

    const payload = { id: findUser._id, name: findUser.name };
    const token = this.jwtService.sign(payload);
    
    const data = {
      user: findUser,
      token: token
    };

    return data;
  }


}

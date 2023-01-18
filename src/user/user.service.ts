import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  )
  {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const plainToHash = await hash(password, 10);
    createUserDto = {...createUserDto, password : plainToHash};
    const userCreated = await this.userModel.create(createUserDto);
    return userCreated;
  }

  findAll() {
    return this.userModel.find({});
  }

  findOne(id: string) {
    return this.userModel.findById({_id:id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

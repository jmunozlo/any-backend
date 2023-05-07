import { User, UserSchema } from 'src/user/schema/user.schema';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name:User.name,
        schema: UserSchema
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ||'qwerty@21',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}

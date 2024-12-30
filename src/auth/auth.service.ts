import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, User as UserModel } from '@prisma/client';
import { RegisterInputDto } from './auth.dto';
import { PrismaService } from '../prisma.service';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserModel) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterInputDto) {
    const { username, email } = user; 
    const usernameFound = await this.usersService.findOne({username});
    if (usernameFound) {
      return "username is already taken"
    } else {
      const emailFound = await this.usersService.findOne({email});
      if (emailFound) {
        return "email is already taken"
      } else {
        try {
          await this.usersService.createUser(user)
          return "Register Success"
        }catch(err){
          console.log(err)
          return "Register Failed"
        }
      }
    }
    return 
  }

  findAll(): Promise<User[]> {
      return this.prisma.user.findMany();
  }

}

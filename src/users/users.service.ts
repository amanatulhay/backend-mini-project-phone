import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  

  async findOne(usersWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: usersWhereUniqueInput,
    });
  }

  async createUser(usersCreateInput: Prisma.UserCreateInput): Promise<User | undefined> {

    const password = await bcrypt.hash(usersCreateInput.password, 10);
    return this.prisma.user.create({
      data: {...usersCreateInput, password, updatedAt: new Date()},
    });
  }
}

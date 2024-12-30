import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma.service';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  private isValidUrl(url: string): boolean {
    let r = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF|SVG|svg))/.test(url);
    return r 
  }

  async create(data: {gender: string, bio: string, userId: number, imageUrl: string}): Promise<Profile | string> {
    const { userId, imageUrl } = data
    const profile = await this.prisma.profile.findUnique({
      where: {userId},
    });
  
    if (profile){
      return "a profile with your userId already exists"
    } else if (!this.isValidUrl(imageUrl)){
      return "Error! Image URL format not supported! Format should be an URL of image (ex: https://....png or http://....jpg , or others: png, jpg, jpeg, gif, png, svg)"
    } else {
      return this.prisma.profile.create({ 
        data,
      });
    }
  }

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async findOne(id: number): Promise<Profile | string>  {
    const profile = await this.prisma.profile.findUnique({
          where: {id},
    });

    if (!profile){
      return "data profile not found"
    } else {
      return profile
    }
  }

  async getAuthProfile(userId: number): Promise<Profile | string>  {
    const profile = await this.prisma.profile.findUnique({
          where: {userId},
    });

    if (!profile){
      return "data profile not found"
    } else {
      return profile
    }
  }

  async update(id: number, data: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({
      where: {id},
    })
    const { gender, bio, imageUrl } = data

    if (!profile){
      return "data profile not found"
    } else if (!this.isValidUrl(imageUrl)){
      return "Error! Image URL format not supported! Format should be an URL of image (ex: https://....png or http://....jpg , or others: png, jpg, jpeg, gif, png, svg)"
    } else {
      const updatedData: UpdateProfileDto = { gender, bio, updatedAt: new Date(), imageUrl}
      return this.prisma.profile.update({
        data: updatedData,
        where: {id},
      });
    }
  }

  async remove(id: number) {
    const profile = await this.prisma.profile.findUnique({
      where: {id},
    })

    if (!profile){
      return "data profile not found"
    } else {
      return this.prisma.profile.delete({
        where: {id},
      });
    }
  }
}


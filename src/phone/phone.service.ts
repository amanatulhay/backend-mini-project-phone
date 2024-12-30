import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PrismaService } from '../prisma.service';
import { Phone } from '@prisma/client';

@Injectable()
export class PhoneService {
  constructor(private prisma: PrismaService) {}

  private isValidDate(date: string): boolean {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[+-]\d{2}:\d{2}|Z)?$/;
    return iso8601Regex.test(date);
  }

  private isValidUrl(url: string): boolean {
    let r = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF|SVG|svg))/.test(url);
    return r 
  }

  async create(data: CreatePhoneDto): Promise<Phone | string> {
    let {brandId, releaseDate, imageUrl} = data
    const brand = await this.prisma.brand.findUnique({
      where: {id: brandId},
    });

    if (!brand){
      return "data brandId not found"
    } else if (!this.isValidDate(releaseDate)){
      return "please use the suitable format of releaseDate (example: 2024-07-24T00:00:00.000Z)"
    } else if (!this.isValidUrl(imageUrl)){
      return "Error! Image URL format not supported! Format should be an URL of image (ex: https://....png or http://....jpg , or others: png, jpg, jpeg, gif, png, svg)"
    } else {
      return this.prisma.phone.create({
        data,
      })
    }
  }

  findAll(): Promise<Phone[]> {
    return this.prisma.phone.findMany();
  }

  async findOne(id: number): Promise<Phone | string> {
    const phone = await this.prisma.phone.findUnique({
      where: {id},
    });

    if (!phone){
      return "data phone not found"
    } else {
      return phone
    }
  }

  async update(id: number, data: CreatePhoneDto) {
    const phone = await this.prisma.phone.findUnique({
      where: {id},
    });

    if (!phone){
      return "data phone not found"
    } else {
      let { brandId, releaseDate, imageUrl } = data
      const brand = await this.prisma.brand.findUnique({
        where: {id: brandId},
      });

      if (!brand){
        return "data brandId not found"
      } else if (!this.isValidDate(releaseDate)){
        return "please use the suitable format of releaseDate (example: 2024-07-24T00:00:00.000Z)"
      } else if (!this.isValidUrl(imageUrl)){
        return "Error! Image URL format not supported! Format should be an URL of image (ex: https://....png or http://....jpg , or others: png, jpg, jpeg, gif, png, svg)"
      } else {
        const { model, price } = data
        const updatedData: UpdatePhoneDto = { model, price, releaseDate, imageUrl, brandId, updatedAt: new Date()}
      
        return this.prisma.phone.update({
          data: updatedData,
          where: {id},
        });
      }
    }

  }

  async remove(id: number) {
    const phone = await this.prisma.phone.findUnique({
      where: {id},
    });

    if (!phone){
      return "data phone not found"
    } else {
      return this.prisma.phone.delete({
        where: {id},
      });
    }
  }

  async findSpecificationByPhoneId(phoneId: number) {
    const specification = await this.prisma.specification.findUnique({
      where: {phoneId},
    });

    if (!specification){
      return "data specification not found"
    } else {
      return specification
    }
  }
}

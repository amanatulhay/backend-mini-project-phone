import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '../prisma.service';
import { Brand } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBrandDto): Promise<Brand> {
    return this.prisma.brand.create({ 
      data,
    });
  }

  findAll(): Promise<Brand[]> {
    return this.prisma.brand.findMany();
  }

  async findOne(id: number): Promise<Brand | string> {
    const brand = await this.prisma.brand.findUnique({
      where: {id},
    });

    if (!brand){
      return "data brand not found"
    } else {
      return brand
    }
  }

  async update(id: number, data: UpdateBrandDto) {
    const brand = await this.prisma.brand.findUnique({
      where: {id},
    });

    if (!brand){
      return "data brand not found"
    } else {
      const { name, countryOfOrigin, imageUrl, yearFounded, popularModels } = data
      const updatedData: UpdateBrandDto = { name, countryOfOrigin, updatedAt: new Date(), imageUrl, yearFounded, popularModels}
      return this.prisma.brand.update({
        data: updatedData,
        where: {id},
      });
    }

  }

  async remove(id: number) {
    const brand = await this.prisma.brand.findUnique({
      where: {id},
    });

    if (!brand){
      return "data brand not found"
    } else {
      return this.prisma.brand.delete({
        where: {id},
      });
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';
import { PrismaService } from '../prisma.service';
import { Specification } from '@prisma/client';

@Injectable()
export class SpecificationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSpecificationDto): Promise<Specification | string> {
    const { phoneId } = data
    const specification = await this.prisma.specification.findUnique({
      where: {phoneId},
    });
    const phone = await this.prisma.phone.findUnique({
      where: {id: phoneId},
    });

    if (specification){
      return "a specification with your phoneId already exists"
    } else if (!phone){
      return "data phone not found"
    } else {
      return this.prisma.specification.create({ 
        data,
      });
    }
  }

  findAll(): Promise<Specification[]> {
    return this.prisma.specification.findMany();
  }

  async findOne(id: number): Promise<Specification | string>  {
    const specification = await this.prisma.specification.findUnique({
          where: {id},
    });

    if (!specification){
      return "data specification not found"
    } else {
      return specification
    }
  }

  async update(id: number, data: UpdateSpecificationDto): Promise<Specification | string> {
    let specification = await this.prisma.specification.findUnique({
          where: {id},
    })
    
    if (!specification){
      return "data specification not found"
    } else {
      let {phoneId: oldPhoneId} = specification
      const { phoneId } = data // new phoneId
      const updatedData: UpdateSpecificationDto = { ...data, updatedAt: new Date()}

      if (oldPhoneId===phoneId){ // not changing the phoneId
        return this.prisma.specification.update({
          data: updatedData,
          where: {id},
        });
      } else { // changing the phoneId
        specification = await this.prisma.specification.findUnique({
          where: {phoneId},
        });
        const phone = await this.prisma.phone.findUnique({
          where: {id: phoneId},
        });
     
        if (specification){
          return "a specification with your phoneId already exists"
        } else if (!phone){
          return "data phone not found"
        } else {
          return this.prisma.specification.update({ 
            data: updatedData,
            where: {id},
          });
        }
      }
    }

  }

  async remove(id: number) {
    const specification = await this.prisma.specification.findUnique({
      where: {id},
    })

    if (!specification){
      return "data specification not found"
    } else {
      return this.prisma.specification.delete({
        where: {id},
      });
    }
  }
}

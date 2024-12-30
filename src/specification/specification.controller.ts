import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put } from '@nestjs/common';
import { SpecificationService } from './specification.service';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/specification')
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSpecificationDto: CreateSpecificationDto) {
    return this.specificationService.create(createSpecificationDto);
  }

  @Get()
  findAll() {
    return this.specificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specificationService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSpecificationDto: UpdateSpecificationDto) {
    return this.specificationService.update(+id, updateSpecificationDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specificationService.remove(+id);
  }
}

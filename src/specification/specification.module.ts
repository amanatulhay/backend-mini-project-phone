import { Module } from '@nestjs/common';
import { SpecificationService } from './specification.service';
import { SpecificationController } from './specification.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SpecificationController],
  providers: [SpecificationService, PrismaService],
})
export class SpecificationModule {}

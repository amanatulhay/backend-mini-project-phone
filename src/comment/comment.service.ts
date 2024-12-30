import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: { content: string, articleId: number, userId: number}): Promise<Comment | string> {
    const { articleId } = data
    const article = await this.prisma.article.findUnique({
      where: {id: articleId},
    });

    if (!article){
      return "data articleId not found"
    } else {
      return this.prisma.comment.create({
        data,
      });
    }
  }

  findAll(): Promise<Comment[]> {
      return this.prisma.comment.findMany();
  }

  async findOne(id: number): Promise<Comment | string> {
      const comment = await this.prisma.comment.findUnique({
        where: {id},
      });
  
      if (!comment){
        return "data comment not found"
      } else {
        return comment
      }
  }

  async update(id: number, data: {content: string, articleId: number, updatedAt: Date}) {
    const comment = await this.prisma.comment.findUnique({
      where: {id},
    });

    if (!comment){
      return "data comment not found"
    } else {
      const { articleId } = data
      const article = await this.prisma.article.findUnique({
        where: {id: articleId},
      });

      if (!article){
        return "data articleId not found"
      } else {
        return this.prisma.comment.update({
          data,
          where: {id},
        });
      }
    }
  }

  async remove(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {id},
    });

    if (!comment){
      return "data comment not found"
    } else {
      return this.prisma.comment.delete({
        where: {id},
      });
    }
  }
}

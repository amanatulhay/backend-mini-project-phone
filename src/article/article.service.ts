import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  private isValidUrl(url: string): boolean {
    let r = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF|SVG|svg))/.test(url);
    return r 
  }

  async create(data: {title: string, content: string, phoneId: number, imageUrl: string, userId: number}): Promise<Article | string> {
    const { phoneId, imageUrl } = data
    const phone = await this.prisma.phone.findUnique({
      where: {id: phoneId},
    });

    if (!phone){
      return "data phoneId not found"
    } else if (!this.isValidUrl(imageUrl)){
      return "Error! Image URL format not supported! Format should be an URL of image (ex: https://....png or http://....jpg , or others: png, jpg, jpeg, gif, png, svg)"
    } else {
      return this.prisma.article.create({
        data,
      });
    }
  }

  findAll(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }

  async findOne(id: number): Promise<Article | string> {
    const article = await this.prisma.article.findUnique({
      where: {id},
    });

    if (!article){
      return "data article not found"
    } else {
      return article
    }
  }

  async update(id: number, data: {title: string, content: string, phoneId: number, updatedAt: Date, imageUrl: string}) {
    const article = await this.prisma.article.findUnique({
      where: {id},
    });

    if (!article){
      return "data article not found"
    } else {
      const { phoneId, imageUrl } = data
      const phone = await this.prisma.phone.findUnique({
        where: {id: phoneId},
      });

      if (!phone){
        return "data phoneId not found"
      } else if (!this.isValidUrl(imageUrl)){
        return "Error! Image URL format not supported! Format should be an URL of image (ex: https://....png or http://....jpg , or others: png, jpg, jpeg, gif, png, svg)"
      } else {
        return this.prisma.article.update({
          data,
          where: {id},
        });
      }
    }
  }

  async remove(id: number) {
    const article = await this.prisma.article.findUnique({
      where: {id},
    });

    if (!article){
      return "data article not found"
    } else {
      return this.prisma.article.delete({
        where: {id},
      });
    }
  }

  async findCommentByArticleId(articleId: number) {
    const article = await this.prisma.article.findUnique({
      where: {id: articleId},
      include: {
        user: true,
        phone: true,
        comment: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!article){
      return "data article not found"
    } else {
      return article
    }
  }
}

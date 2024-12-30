import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() data: CreateArticleDto
  ) {
    let {userId} = req.user
    return this.articleService.create({...data, userId});
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: CreateArticleDto
  ) {
    return this.articleService.update(+id, {...data, updatedAt: new Date()});
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }

  @Get(':articleId/comment')
  findCommentByArticleId(@Param('articleId') articleId: string) {
    return this.articleService.findCommentByArticleId(+articleId);
  }
}

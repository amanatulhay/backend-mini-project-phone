import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { BrandModule } from './brand/brand.module';
import { PhoneModule } from './phone/phone.module';
import { SpecificationModule } from './specification/specification.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UsersModule, AuthModule, ProfileModule, BrandModule, PhoneModule, SpecificationModule, ArticleModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

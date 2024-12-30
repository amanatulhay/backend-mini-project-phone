import { IsInt, IsString, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    articleId: number;
}

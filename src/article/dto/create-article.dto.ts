import { IsInt, IsString, IsUrl, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    phoneId: number;

    @ApiProperty()
    @IsUrl({}, { message: 'Please provide a valid image URL' })
    imageUrl: string;

}

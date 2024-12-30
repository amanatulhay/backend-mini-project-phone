import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class CreateProfileDto {

    @ApiProperty()
    @IsString()
    gender: string;

    @ApiProperty()
    @IsString()
    bio: string;

    @ApiProperty()
    @IsUrl({}, { message: 'Please provide a valid image URL' })
    imageUrl: string;

}
import { IsInt, IsString, IsUrl, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
        
    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsString()
    countryOfOrigin: string;

    @ApiProperty()
    @IsUrl({}, { message: 'Please provide a valid image URL' })
    imageUrl: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    yearFounded: number;

    @ApiProperty()
    @IsString()
    popularModels: string;

}

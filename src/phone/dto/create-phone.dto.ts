import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsString, IsUrl, Min } from "class-validator";

export class CreatePhoneDto {
        @ApiProperty()
        @IsString()
        model: string;
    
        @ApiProperty()
        @IsInt()
        @Min(0)
        price: number;

        @ApiProperty({
                description: 'The release date of the phone in ISO 8601 format (optional)',
                type: String,
                format: 'date-time',
                required: false,
        })
        @IsDateString() 
        releaseDate: string;

        @ApiProperty()
        @IsUrl({}, { message: 'Please provide a valid image URL' })
        imageUrl: string;

        @ApiProperty()
        @IsInt()
        @Min(0)
        brandId: number;
}

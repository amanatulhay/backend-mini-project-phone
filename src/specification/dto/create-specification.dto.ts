import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min } from "class-validator";

export class CreateSpecificationDto {

    @ApiProperty()
    @IsInt()
    @Min(0)
    phoneId: number;

    @ApiProperty()
    @IsString()
    processor: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    ram: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    internalMemory: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    camera: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    battery: number;

    @ApiProperty()
    @IsString()
    os: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    weight: number;

    @ApiProperty()
    @IsString()
    color: string;    

}


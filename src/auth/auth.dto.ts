import { ApiProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

export class RegisterInputDto {
 
  @ApiProperty()
  @IsString()
  username: string;
  
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}


export class LoginInputDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

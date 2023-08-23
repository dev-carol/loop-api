import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'O que você está pensando hoje...',
    example: 'O dia está lindo',
  })
  @IsNotEmpty()
  @IsString()
  content_post: string;

  @IsNotEmpty()
  @IsString()
  user: string;
}

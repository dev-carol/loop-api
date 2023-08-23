import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Seu nome',
    example: 'Maria',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Seu email',
    example: 'email@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Sua data de aniversário',
    example: '20/05/1999',
  })
  @IsString()
  @IsNotEmpty()
  date_birthday: string;

  @ApiProperty({
    description: 'Uma descrição sobre você',
    example: '24 anos, moro em São Paulo e amo os animais',
  })
  @IsString()
  bio: string | null;
}

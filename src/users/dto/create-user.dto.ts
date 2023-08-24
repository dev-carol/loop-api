import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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
    description: 'Digite uma senha',
    example: 'Senha@123',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha fraca',
  })
  password: string;

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
  @IsNotEmpty()
  @IsString()
  bio: string | null;
}

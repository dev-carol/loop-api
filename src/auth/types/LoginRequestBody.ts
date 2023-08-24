import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestBody {

  @ApiProperty({
    description: 'Email',
    example: 'email@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha',
    example: 'Senha@123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

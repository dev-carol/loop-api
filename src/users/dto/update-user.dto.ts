import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  date_birthday: string;

  @IsString()
  bio: string | null;
}

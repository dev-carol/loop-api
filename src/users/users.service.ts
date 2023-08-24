import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, date_birthday, bio, password } = createUserDto;

    if (!name || !email || !date_birthday || bio === undefined || !password) {
      throw new BadRequestException('Todos os campos devem ser preenchidos');
    }

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Já existe um usuário com este email');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.prismaService.user.create({
        data: {
          name,
          email,
          date_birthday,
          bio,
          password: hashedPassword,
        },
      });

      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      throw new Error(`Erro ao criar o usuário: ${error.message}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findAll() {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Erro ao excluir usuário: ${error.message}`);
    }
  }
}

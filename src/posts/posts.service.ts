import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    try {
      return await this.prismaService.post.create({
        data: {
          content_post: createPostDto.content_post,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao criar postagem: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const posts = await this.prismaService.post.findMany();

      if (posts.length === 0) {
        throw new NotFoundException('Não há publicações no momento.');
      }

      return posts;
    } catch (error) {
      throw new NotFoundException('Não há publicações no momento.');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.post.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Postagem não encontrada com o ID ${id}`);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const existingPost = await this.prismaService.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new NotFoundException(`Postagem não foi encontrado com o ID ${id}`);
      }

      return await this.prismaService.post.update({
        where: { id },
        data: {
          content_post: updatePostDto.content_post,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao atualizar postagem: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const existingPost = await this.prismaService.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new NotFoundException(`Postagem não foi encontrada com o ID ${id}`);
      }

      return await this.prismaService.post.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao excluir postagem: ${error.message}`,
      );
    }
  }
}

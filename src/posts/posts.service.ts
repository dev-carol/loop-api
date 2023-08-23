import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new Error(`Erro ao criar postagem: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.post.findMany();
    } catch (error) {
      throw new Error(`Erro ao buscar postagens: ${error.message}`);
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
      throw new Error(`Erro ao buscar postagem: ${error.message}`);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const existingPost = await this.prismaService.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new NotFoundException('Publicação não foi encontrada');
      }

      return await this.prismaService.post.update({
        where: { id },
        data: {
          content_post: updatePostDto.content_post,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar postagem: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const existingPost = await this.prismaService.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new NotFoundException('Publicação não foi encontrada');
      }

      return await this.prismaService.post.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Erro ao excluir postagem: ${error.message}`);
    }
  }
}

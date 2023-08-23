import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    return this.prismaService.post.create({
      data: {
        content_post: createPostDto.content_post,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.post.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.post.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const existingPost = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }

    return this.prismaService.post.update({
      where: { id },
      data: {
        content_post: updatePostDto.content_post,
      },
    });
  }

  async remove(id: number) {
    const existingPost = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }

    return this.prismaService.post.delete({
      where: { id },
    });
  }
}

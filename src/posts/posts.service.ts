import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return this.prismaService.post.findMany();
  }

  findOne(id: number) {
    return this.prismaService.post.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

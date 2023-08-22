import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

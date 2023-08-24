import { Post } from '../../posts/entities/post.entity';
export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  date_birthday: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
}

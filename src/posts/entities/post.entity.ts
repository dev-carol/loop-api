import { User } from '../../users/entities/user.entity';

export class Post {
  id?: number;
  content_post: string;
  user?: User;
  createdAt: Date;
  userId?: string;
}

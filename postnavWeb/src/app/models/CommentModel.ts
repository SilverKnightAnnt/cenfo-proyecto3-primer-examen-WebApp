import {UserModel} from './UserModel';
import {PostModel} from './PostModel';

export class CommentModel {
  public id: number;
  constructor(public comment: string,
              public post: PostModel,
              public user: UserModel
  ) {}
}

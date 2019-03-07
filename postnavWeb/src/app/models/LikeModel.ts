import {UserModel} from './UserModel';
import {PostModel} from './PostModel';

export class LikeModel {
  public id: number;
  constructor(public user: UserModel,
              public post: PostModel
  ) {}
}

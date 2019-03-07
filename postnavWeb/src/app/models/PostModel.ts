import {UserModel} from './UserModel';
import {TagModel} from './TagModel';

export class PostModel{
  public id: number;
  constructor(public title: string,
              public text: string,
              public status: string,
              public image: string,
              public user: UserModel,
              public tags: TagModel[]
  ) {}
}

import {TagModel} from './TagModel';

export class UserModel {
  public id: number;
  constructor(public nickName: string,
              public status: string,
              public tags: TagModel[]
  ) {}
}

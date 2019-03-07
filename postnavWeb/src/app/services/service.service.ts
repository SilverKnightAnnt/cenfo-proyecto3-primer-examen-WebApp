import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TagModel} from '../models/TagModel';
import {UserModel} from '../models/UserModel';
import {PostModel} from '../models/PostModel';
import {LikeModel} from '../models/LikeModel';
import {CommentModel} from '../models/CommentModel';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  getPosts(key: string): Observable<any[]> {
    const url = `http://localhost:8080/api/user/general-view/`.concat(key);
    return this.http.get<any[]>(url);
  }

  getRecommendedPosts(key: string): Observable<any[]> {
    const url = `http://localhost:8080/api/user/recommended-posts/`.concat(key);
    return this.http.get<any[]>(url);
  }

  getUserPosts(key: string): Observable<any[]> {
    const url = `http://localhost:8080/api/post/show-user-posts/`.concat(key);
    return this.http.get<any[]>(url);
  }

  getLikedPosts(key: string): Observable<any[]> {
    const url = `http://localhost:8080/api/likes/show-liked-posts/`.concat(key);
    return this.http.get<any[]>(url);
  }

  getPreferences(): Observable<any[]> {
    const url = `http://localhost:8080/api/tag/`;
    return this.http.get<any[]>(url);
  }

  postPreferences(tag: TagModel) {
    const url = `http://localhost:8080/api/tag/`;
    this.http.post<TagModel>(url, tag).subscribe(data => {
    console.log('POST Request is successful ');
  });
}

  postUsers(user: UserModel) {
    const url = `http://localhost:8080/api/user/`;
    this.http.post<UserModel>(url, user).subscribe(data => {
      console.log('POST Request is successful ');
    });
}

  postPosts(post: PostModel) {
    const url = `http://localhost:8080/api/post/`;
    this.http.post<PostModel>(url, post).subscribe(data => {
      console.log('POST Request is successful ');
    });
  }

  getUser(nickName: string): Observable<any> {
    const url = `http://localhost:8080/api/user/login/`.concat(nickName);
    return this.http.get<any>(url);
  }

  postLikes(like: LikeModel) {
    const url = `http://localhost:8080/api/likes/`;
    this.http.post<LikeModel>(url, like).subscribe(data => {
      console.log('POST Request is successful ');
    });
  }

  deleteLikes (like: LikeModel) {
    const url = `http://localhost:8080/api/likes/` + like.user.id + '/' + like.post.id;
    this.http.delete(url).subscribe(data => {
      console.log('DELETE Request is successful ');
    });
  }

  getPostCommentaries(post: number): Observable<any[]> {
    const url = `http://localhost:8080/api/comment/show-post-comments/`.concat(post.toString());
    return this.http.get<any[]>(url);
  }

  postComment(comment: CommentModel) {
    const url = `http://localhost:8080/api/comment/`;
    this.http.post<CommentModel>(url, comment).subscribe(data => {
      console.log('POST Request is successful ');
    });
  }

  getUserComments(user: number): Observable<any[]> {
    const url = `http://localhost:8080/api/comment/show-user-comments/`.concat(user.toString());
    return this.http.get<any[]>(url);
  }

  editComment(comment: CommentModel) {
    const url = `http://localhost:8080/api/comment/` + comment.user.id + '/' + comment.id;
    this.http.put<CommentModel>(url, comment).subscribe(data => {
      console.log('PUT Request is successful ');
    });
  }

  getUsers(): Observable<any[]> {
    const url = `http://localhost:8080/api/user/`;
    return this.http.get<any[]>(url);
  }

  getAllPosts(): Observable<any[]> {
    const url = `http://localhost:8080/api/post/`;
    return this.http.get<any[]>(url);
  }
}

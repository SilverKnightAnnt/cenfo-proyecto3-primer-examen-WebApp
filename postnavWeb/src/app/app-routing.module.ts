import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent} from './loginform/loginform.component';
import { UserregistrationformComponent} from './userregistrationform/userregistrationform.component';
import {PreferenceregistrationformComponent} from './preferenceregistrationform/preferenceregistrationform.component';
import { GeneralviewComponent} from './generalview/generalview.component';
import { LikedpostsComponent} from './likedposts/likedposts.component';
import { RecommendedpostsComponent} from './recommendedposts/recommendedposts.component';
import {UserpostsComponent} from './userposts/userposts.component';
import {PostsregistrationformComponent} from './postsregistrationform/postsregistrationform.component';
import {CommentariesComponent} from './commentaries/commentaries.component';

const routes: Routes = [
  {
    path: '',
    component: LoginformComponent
  },
  {
    path: 'Registration/User',
    component: UserregistrationformComponent
  },
  {
    path: 'Registration/Preferences',
    component: PreferenceregistrationformComponent
  },
  {
    path: 'Posts/General',
    component: GeneralviewComponent
  },
  {
    path: 'Posts/LikedPosts',
    component: LikedpostsComponent
  },
  {
    path: 'Posts/RecommendedPosts',
    component: RecommendedpostsComponent
  },
  {
    path: 'Posts/UserPosts',
    component: UserpostsComponent
  },
  {
    path: 'Posts/Registration',
    component: PostsregistrationformComponent
  },
  {
    path: 'Posts/Commentaries',
    component: CommentariesComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

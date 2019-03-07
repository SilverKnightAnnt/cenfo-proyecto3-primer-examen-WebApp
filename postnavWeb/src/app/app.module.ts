import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PostsService} from './services/service.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginformComponent } from './loginform/loginform.component';
import { AppRoutingModule } from './/app-routing.module';
import { UserregistrationformComponent } from './userregistrationform/userregistrationform.component';
import { PreferenceregistrationformComponent } from './preferenceregistrationform/preferenceregistrationform.component';
import { GeneralviewComponent } from './generalview/generalview.component';
import { LikedpostsComponent } from './likedposts/likedposts.component';
import { UserpostsComponent } from './userposts/userposts.component';
import { RecommendedpostsComponent } from './recommendedposts/recommendedposts.component';
import { PostsregistrationformComponent } from './postsregistrationform/postsregistrationform.component';
import { CommentariesComponent } from './commentaries/commentaries.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    UserregistrationformComponent,
    PreferenceregistrationformComponent,
    GeneralviewComponent,
    LikedpostsComponent,
    UserpostsComponent,
    RecommendedpostsComponent,
    PostsregistrationformComponent,
    CommentariesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

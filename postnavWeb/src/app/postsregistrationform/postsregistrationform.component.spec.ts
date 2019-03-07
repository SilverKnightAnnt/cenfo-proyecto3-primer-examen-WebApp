import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsregistrationformComponent } from './postsregistrationform.component';

describe('PostsregistrationformComponent', () => {
  let component: PostsregistrationformComponent;
  let fixture: ComponentFixture<PostsregistrationformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsregistrationformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsregistrationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

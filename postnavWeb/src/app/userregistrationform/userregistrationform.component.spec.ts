import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserregistrationformComponent } from './userregistrationform.component';

describe('UserregistrationformComponent', () => {
  let component: UserregistrationformComponent;
  let fixture: ComponentFixture<UserregistrationformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserregistrationformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserregistrationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

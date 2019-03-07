import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceregistrationformComponent } from './preferenceregistrationform.component';

describe('PreferenceregistrationformComponent', () => {
  let component: PreferenceregistrationformComponent;
  let fixture: ComponentFixture<PreferenceregistrationformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceregistrationformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceregistrationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

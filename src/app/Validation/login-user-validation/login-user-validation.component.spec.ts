import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserValidationComponent } from './login-user-validation.component';

describe('LoginUserValidationComponent', () => {
  let component: LoginUserValidationComponent;
  let fixture: ComponentFixture<LoginUserValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginUserValidationComponent]
    });
    fixture = TestBed.createComponent(LoginUserValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserValidationComponent } from './register-user-validation.component';

describe('RegisterUserValidationComponent', () => {
  let component: RegisterUserValidationComponent;
  let fixture: ComponentFixture<RegisterUserValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterUserValidationComponent]
    });
    fixture = TestBed.createComponent(RegisterUserValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

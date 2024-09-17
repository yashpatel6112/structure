import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpModelComponent } from './otp-model.component';

describe('OtpModelComponent', () => {
  let component: OtpModelComponent;
  let fixture: ComponentFixture<OtpModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompLoginPage } from './comp-login-page';

describe('CompLoginPage', () => {
  let component: CompLoginPage;
  let fixture: ComponentFixture<CompLoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompLoginPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

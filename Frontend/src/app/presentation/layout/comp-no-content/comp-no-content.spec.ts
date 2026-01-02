import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompNoContent } from './comp-no-content';

describe('CompNoContent', () => {
  let component: CompNoContent;
  let fixture: ComponentFixture<CompNoContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompNoContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompNoContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompEventForm } from './comp-event-form';

describe('CompEventForm', () => {
  let component: CompEventForm;
  let fixture: ComponentFixture<CompEventForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompEventForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompEventForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

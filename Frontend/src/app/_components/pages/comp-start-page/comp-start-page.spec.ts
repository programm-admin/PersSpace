import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompStartPage } from './comp-start-page';

describe('CompStartPage', () => {
  let component: CompStartPage;
  let fixture: ComponentFixture<CompStartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompStartPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

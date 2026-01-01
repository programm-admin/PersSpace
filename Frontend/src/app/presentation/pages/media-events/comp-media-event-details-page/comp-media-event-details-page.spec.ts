import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMediaEventDetailsPage } from './comp-media-event-details-page';

describe('CompMediaEventDetailsPage', () => {
  let component: CompMediaEventDetailsPage;
  let fixture: ComponentFixture<CompMediaEventDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompMediaEventDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompMediaEventDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

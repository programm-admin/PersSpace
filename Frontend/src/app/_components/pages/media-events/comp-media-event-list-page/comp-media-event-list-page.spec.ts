import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMediaEventListPage } from './comp-media-event-list-page';

describe('CompMediaEventListPage', () => {
  let component: CompMediaEventListPage;
  let fixture: ComponentFixture<CompMediaEventListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompMediaEventListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompMediaEventListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

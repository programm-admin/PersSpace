import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompDeleteDialog } from './comp-delete-dialog';

describe('CompDeleteDialog', () => {
  let component: CompDeleteDialog;
  let fixture: ComponentFixture<CompDeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompDeleteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompDeleteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

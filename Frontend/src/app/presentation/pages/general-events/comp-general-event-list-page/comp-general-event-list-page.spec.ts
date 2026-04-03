import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompGenerlEventListPage } from './comp-general-event-list-page';

describe('CompMediaEventListPage', () => {
    let component: CompGenerlEventListPage;
    let fixture: ComponentFixture<CompGenerlEventListPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompGenerlEventListPage],
        }).compileComponents();

        fixture = TestBed.createComponent(CompGenerlEventListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCreateGeneralEventPage } from './comp-create-general-event-page';

describe('CompCreateMediaEventPage', () => {
    let component: CompCreateGeneralEventPage;
    let fixture: ComponentFixture<CompCreateGeneralEventPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompCreateGeneralEventPage],
        }).compileComponents();

        fixture = TestBed.createComponent(CompCreateGeneralEventPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

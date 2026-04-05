import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompGeneralEventDetailsPage } from './comp-general-event-details-page';

describe('CompMediaEventDetailsPage', () => {
    let component: CompGeneralEventDetailsPage;
    let fixture: ComponentFixture<CompGeneralEventDetailsPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompGeneralEventDetailsPage],
        }).compileComponents();

        fixture = TestBed.createComponent(CompGeneralEventDetailsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

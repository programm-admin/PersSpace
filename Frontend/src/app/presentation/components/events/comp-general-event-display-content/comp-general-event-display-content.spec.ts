import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompGeneralEventDisplayContent } from './comp-general-event-display-content';

describe('CompMediaEventDisplayContent', () => {
    let component: CompGeneralEventDisplayContent;
    let fixture: ComponentFixture<CompGeneralEventDisplayContent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompGeneralEventDisplayContent],
        }).compileComponents();

        fixture = TestBed.createComponent(CompGeneralEventDisplayContent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

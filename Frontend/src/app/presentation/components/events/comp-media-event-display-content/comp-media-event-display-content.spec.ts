import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMediaEventDisplayContent } from './comp-media-event-display-content';

describe('CompMediaEventDisplayContent', () => {
    let component: CompMediaEventDisplayContent;
    let fixture: ComponentFixture<CompMediaEventDisplayContent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompMediaEventDisplayContent],
        }).compileComponents();

        fixture = TestBed.createComponent(CompMediaEventDisplayContent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

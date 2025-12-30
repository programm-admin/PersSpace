import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCreateMediaEventPage } from './comp-create-media-event-page';

describe('CompCreateMediaEventPage', () => {
    let component: CompCreateMediaEventPage;
    let fixture: ComponentFixture<CompCreateMediaEventPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompCreateMediaEventPage],
        }).compileComponents();

        fixture = TestBed.createComponent(CompCreateMediaEventPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

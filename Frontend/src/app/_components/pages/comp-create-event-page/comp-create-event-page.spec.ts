import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCreateEventPage } from './comp-create-event-page';

describe('CompCreateEventPage', () => {
    let component: CompCreateEventPage;
    let fixture: ComponentFixture<CompCreateEventPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompCreateEventPage],
        }).compileComponents();

        fixture = TestBed.createComponent(CompCreateEventPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

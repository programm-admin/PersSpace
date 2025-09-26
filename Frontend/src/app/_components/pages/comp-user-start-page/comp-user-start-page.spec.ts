import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompUserStartPage } from './comp-user-start-page';

describe('CompUserStartPage', () => {
    let component: CompUserStartPage;
    let fixture: ComponentFixture<CompUserStartPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompUserStartPage],
        }).compileComponents();

        fixture = TestBed.createComponent(CompUserStartPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

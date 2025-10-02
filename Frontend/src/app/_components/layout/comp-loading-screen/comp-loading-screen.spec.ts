import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompLoadingScreen } from './comp-loading-screen';

describe('CompLoadingScreen', () => {
    let component: CompLoadingScreen;
    let fixture: ComponentFixture<CompLoadingScreen>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompLoadingScreen],
        }).compileComponents();

        fixture = TestBed.createComponent(CompLoadingScreen);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

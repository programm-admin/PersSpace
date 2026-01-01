import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAuthWrapper } from './comp-auth-wrapper';

describe('CompAuthWrapper', () => {
    let component: CompAuthWrapper;
    let fixture: ComponentFixture<CompAuthWrapper>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompAuthWrapper],
        }).compileComponents();

        fixture = TestBed.createComponent(CompAuthWrapper);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

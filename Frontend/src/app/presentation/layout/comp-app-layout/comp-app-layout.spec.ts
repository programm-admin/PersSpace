import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAppLayout } from './comp-app-layout';

describe('CompAppLayout', () => {
    let component: CompAppLayout;
    let fixture: ComponentFixture<CompAppLayout>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompAppLayout],
        }).compileComponents();

        fixture = TestBed.createComponent(CompAppLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

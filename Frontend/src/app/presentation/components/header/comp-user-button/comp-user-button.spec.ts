import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompUserButton } from './comp-user-button';

describe('CompUserButton', () => {
    let component: CompUserButton;
    let fixture: ComponentFixture<CompUserButton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompUserButton],
        }).compileComponents();

        fixture = TestBed.createComponent(CompUserButton);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

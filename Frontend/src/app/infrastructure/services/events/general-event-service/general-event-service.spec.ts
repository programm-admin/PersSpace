import { TestBed } from '@angular/core/testing';

import { GeneralEventService } from './general-event-service';

describe('MediaEventService', () => {
    let service: GeneralEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GeneralEventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

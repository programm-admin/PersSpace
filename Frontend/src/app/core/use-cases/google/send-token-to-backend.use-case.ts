import { inject } from '@angular/core';
import { IT_GOOGLE_REPOSITORY } from '../../repositories/google.repository';
import { Observable } from 'rxjs';

export class UC_Google_SendTokenToBackend {
    private readonly googleRepository = inject(IT_GOOGLE_REPOSITORY);

    public execute = (token: string): Observable<string> => {
        return this.googleRepository.sendTokenToBackend(token);
    };
}

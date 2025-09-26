import { inject, Injectable } from '@angular/core';
import { IT_GOOGLE_REPOSITORY } from '../../repositories/google.repository';

@Injectable()
export class UC_Google_LoadScript {
    private readonly googleRepository = inject(IT_GOOGLE_REPOSITORY);

    public execute = () => {
        return this.googleRepository.loadScript();
    };
}

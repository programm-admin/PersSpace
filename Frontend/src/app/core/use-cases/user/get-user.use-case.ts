import { inject, Injectable, Signal } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../repositories/user.repository';
import { M_User } from '../../models/user.model';

@Injectable()
export class UC_User_GetUser {
    private readonly userRepository = inject(IT_USER_REPOSITORY);

    public execute = (): Signal<M_User | null> => {
        return this.userRepository.getUser();
    };
}

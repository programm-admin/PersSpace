import { Component, inject } from '@angular/core';
import { UC_User_GetUser } from '../../../core/use-cases/user/get-user.use-case';

@Component({
    selector: 'app-comp-user-start-page',
    imports: [],
    templateUrl: './comp-user-start-page.html',
    styleUrl: './comp-user-start-page.scss',
    providers: [UC_User_GetUser],
})
export class CompUserStartPage {
    public readonly getUserUseCase = inject(UC_User_GetUser);
}

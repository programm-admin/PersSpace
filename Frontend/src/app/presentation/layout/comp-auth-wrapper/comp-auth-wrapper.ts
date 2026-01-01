import {
    afterNextRender,
    Component,
    inject,
    PLATFORM_ID,
    signal,
    WritableSignal,
} from '@angular/core';
import { IT_USER_REPOSITORY } from '../../../core/repositories/user.repository';
import { isPlatformBrowser } from '@angular/common';
import { CompLoadingScreen } from '../comp-loading-screen/comp-loading-screen';

@Component({
    selector: 'app-comp-auth-wrapper',
    imports: [CompLoadingScreen],
    templateUrl: './comp-auth-wrapper.html',
    styleUrl: './comp-auth-wrapper.scss',
})
export class CompAuthWrapper {
    private readonly userRepository = inject(IT_USER_REPOSITORY);
    private readonly platformID = inject(PLATFORM_ID);

    public readonly user = this.userRepository.getUser();
    public isHydrated: WritableSignal<boolean> = signal(false);

    constructor() {
        if (isPlatformBrowser(this.platformID)) {
            afterNextRender(() => {
                this.isHydrated.set(true);
            });
        }
    }
}

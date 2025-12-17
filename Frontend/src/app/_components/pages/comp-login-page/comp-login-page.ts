declare var google: any;
import {
    AfterViewInit,
    Component,
    inject,
    OnInit,
    PLATFORM_ID,
    signal,
    Signal,
    WritableSignal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { UC_String_GetPathFromRoute } from '../../../core/use-cases/string/get-path-from-route.use-case';
import { UC_Google_LoadScript } from '../../../core/use-cases/google/load-script.use-case';
import { UC_User_SetUserSubject } from '../../../core/use-cases/user/set-user-subject.use-case';
import { UC_Google_SendTokenToBackend } from '../../../core/use-cases/google/send-token-to-backend.use-case';
import { CLIENT_ID } from '../../../environment/env';
import { UC_Storage_SetUserToStorage } from '../../../core/use-cases/storage/set-user-to-storage.use-case';
import { UC_Storage_ClearStorage } from '../../../core/use-cases/storage/clear-storage.use-case';
import { M_User } from '../../../core/models/user.model';

@Component({
    selector: 'app-comp-login-page',
    imports: [],
    templateUrl: './comp-login-page.html',
    styleUrl: './comp-login-page.scss',
    providers: [
        UC_Google_LoadScript,
        UC_User_SetUserSubject,
        UC_Google_SendTokenToBackend,
        UC_Storage_SetUserToStorage,
        UC_Storage_ClearStorage,
    ],
})
export class CompLoginPage implements AfterViewInit {
    public isLoadingSignal: WritableSignal<boolean> = signal<boolean>(false);
    public isLoaded: boolean = false;

    private readonly platformID = inject(PLATFORM_ID);
    private readonly router: Router = inject(Router);
    private readonly getPathFromRouteUseCase = inject(UC_String_GetPathFromRoute);
    private readonly loadScriptUseCase = inject(UC_Google_LoadScript);
    private readonly setUserSubjectUseCase = inject(UC_User_SetUserSubject);
    private readonly sendTokenToBackendUseCase = inject(UC_Google_SendTokenToBackend);
    private readonly setUserToStorageUseCase = inject(UC_Storage_SetUserToStorage);
    private readonly clearStorageUseCase = inject(UC_Storage_ClearStorage);

    async ngAfterViewInit(): Promise<void> {
        if (isPlatformBrowser(this.platformID)) {
            await this.loadScriptUseCase.execute();
            this.loadGoogleLoginButton();
        }
    }

    public loadGoogleLoginButton = () => {
        if (typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: (res: any) => {
                    const token: string = res.credential;

                    this.isLoadingSignal.set(true);
                    this.sendTokenToBackendUseCase.execute(token).subscribe({
                        next: (res: M_User) => {
                            // set data into storage
                            const userSet: boolean = this.setUserToStorageUseCase.execute(res);
                            console.log('[COMP LOGIN PAGE] response from backend user:', res);
                            if (!userSet) {
                                // clear storage and navigate user back to start page
                                this.clearStorageUseCase.execute();
                                this.setUserSubjectUseCase.execute(null);
                                this.router.navigate([
                                    this.getPathFromRouteUseCase.execute(APPLICATION_ROUTES.start),
                                ]);
                                return;
                            }

                            this.setUserSubjectUseCase.execute(res);
                            this.router.navigate([
                                this.getPathFromRouteUseCase.execute(APPLICATION_ROUTES.userStart),
                            ]);
                        },
                        error: (err: any) => {},
                        complete: () => {
                            this.isLoadingSignal.set(false);
                        },
                    });
                },
                auto_select: false, // wichtig!
                cancel_on_tap_outside: false, // verhindert, dass der Button verschwindet
            });

            google.accounts.id.renderButton(document.getElementById('login-btn'), {
                theme: 'outline',
                size: 'large',
                shape: 'rectangle',
                width: 350,
            });
        }
    };
}

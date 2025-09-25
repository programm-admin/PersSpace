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
import { UC_Storage_SetItem } from '../../../core/use-cases/storage/set-storage-item.use-case';
import { LOCAL_STORAGE_KEY_USER_TOKEN } from '../../../shared/variables/storage-keys';
import { UC_Google_LoadScript } from '../../../core/use-cases/google/load-script.use-case';
import { UC_User_SetUserToken } from '../../../core/use-cases/user/set-user-token.use-case';
import { UC_Google_SendTokenToBackend } from '../../../core/use-cases/google/send-token-to-backend.use-case';
import { CLIENT_ID } from '../../../environment/env';

@Component({
  selector: 'app-comp-login-page',
  imports: [],
  templateUrl: './comp-login-page.html',
  styleUrl: './comp-login-page.scss',
  providers: [
    UC_Storage_SetItem,
    UC_Google_LoadScript,
    UC_User_SetUserToken,
    UC_Google_SendTokenToBackend,
  ],
})
export class CompLoginPage implements OnInit, AfterViewInit {
  public isLoadingSignal: WritableSignal<boolean> = signal<boolean>(false);
  public isLoaded: boolean = false;

  private readonly platformID = inject(PLATFORM_ID);
  private readonly router: Router = inject(Router);
  private readonly getPathFromRouteUseCase = inject(UC_String_GetPathFromRoute);
  private readonly setStorageItemUseCase = inject(UC_Storage_SetItem);
  private readonly loadScriptUseCase = inject(UC_Google_LoadScript);
  private readonly setUserTokenUseCase = inject(UC_User_SetUserToken);
  private readonly sendTokenToBackendUseCase = inject(UC_Google_SendTokenToBackend);

  ngOnInit(): void {}

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
            next: (res: string) => {
              this.setStorageItemUseCase.execute(LOCAL_STORAGE_KEY_USER_TOKEN, res);
              this.setUserTokenUseCase.execute(res);
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

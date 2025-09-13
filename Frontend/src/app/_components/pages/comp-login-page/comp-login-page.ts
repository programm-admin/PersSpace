declare var google: any;
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  Signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CLIENT_ID } from '../../../environment/env';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { UC_String_GetPathFromRoute } from '../../../core/use-cases/string/get-path-from-route.use-case';
import { UC_Storage_SetItem } from '../../../core/use-cases/storage/set-storage-item.use-case';
import { LOCAL_STORAGE_KEY_USER_TOKEN } from '../../../shared/variables/storage-keys';
import { UC_Google_LoadScript } from '../../../core/use-cases/google/load-script.use-case';
import { UC_User_SetUserToken } from '../../../core/use-cases/user/set-user-token.use-case';

@Component({
  selector: 'app-comp-login-page',
  imports: [],
  templateUrl: './comp-login-page.html',
  styleUrl: './comp-login-page.scss',
  providers: [
    UC_String_GetPathFromRoute,
    UC_Storage_SetItem,
    UC_Google_LoadScript,
    UC_User_SetUserToken,
  ],
})
export class CompLoginPage implements OnInit, AfterViewInit {
  public isLoading: Signal<boolean> = signal<boolean>(false);

  private readonly platformID = inject(PLATFORM_ID);
  private readonly router: Router = inject(Router);
  private readonly getPathFromRouteUseCase = inject(UC_String_GetPathFromRoute);
  private readonly setStorageItemUseCase = inject(UC_Storage_SetItem);
  private readonly loadScriptUseCase = inject(UC_Google_LoadScript);
  private readonly setUserTokenUseCase = inject(UC_User_SetUserToken);
  public isLoaded: boolean = false;

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
          console.log(res.credential);
          const token: string = res.credential;

          this.setStorageItemUseCase.execute(LOCAL_STORAGE_KEY_USER_TOKEN, token);
          this.setUserTokenUseCase.execute(token);

          this.router.navigate([
            this.getPathFromRouteUseCase.execute(APPLICATION_ROUTES.userStart),
          ]);
        },
        auto_select: false, // wichtig!
        cancel_on_tap_outside: false, // verhindert, dass der Button verschwindet
      });

      console.log('google is defined');
      google.accounts.id.renderButton(document.getElementById('login-btn'), {
        theme: 'outline',
        size: 'large',
        shape: 'rectangle',
        width: 350,
      });
    }
  };
}

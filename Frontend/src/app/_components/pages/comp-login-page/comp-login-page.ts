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

@Component({
  selector: 'app-comp-login-page',
  imports: [],
  templateUrl: './comp-login-page.html',
  styleUrl: './comp-login-page.scss',
  providers: [UC_String_GetPathFromRoute],
})
export class CompLoginPage implements OnInit, AfterViewInit {
  public isLoading: Signal<boolean> = signal<boolean>(false);

  private readonly platformID = inject(PLATFORM_ID);
  private readonly router: Router = inject(Router);
  private readonly getPathFromRouteUseCase = inject(UC_String_GetPathFromRoute);

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformID)) {
      if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (res: any) => {
            console.log(res);
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
    }
  }
}

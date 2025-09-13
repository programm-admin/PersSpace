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

@Component({
  selector: 'app-comp-login-page',
  imports: [],
  templateUrl: './comp-login-page.html',
  styleUrl: './comp-login-page.scss',
})
export class CompLoginPage implements OnInit, AfterViewInit {
  public isLoading: Signal<boolean> = signal<boolean>(false);

  private platformID = inject(PLATFORM_ID);

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformID)) {
      if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (res: any) => {
            console.log(res);
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

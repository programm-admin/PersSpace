// google-auth.service.ts
import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { T_GoogleRepository } from '../../../core/repositories/google.repository';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACKEND_ID } from '../../../environment/env';

@Injectable({ providedIn: 'root' })
export class GoogleAuthService implements T_GoogleRepository {
  private scriptLoaded = false;
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Nur im Browser laden
      if (!isPlatformBrowser(this.platformId)) {
        resolve();
        return;
      }

      // Falls bereits geladen
      if (this.scriptLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };

      script.onerror = (err) => reject(err);

      document.head.appendChild(script);
    });
  }

  public sendTokenToBackend = (token: string): Observable<string> => {
    console.log('token', token);
    return this.http.post<string>(BACKEND_ID + 'auth/login', { token }, { withCredentials: true });
  };
}

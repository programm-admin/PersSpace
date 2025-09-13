import { Injectable } from '@angular/core';
import { T_StringRepository } from '../../../core/repositories/string.repository';
import { T_ApplicationRoute } from '../../../shared/types-and-interfaces/application-route';

@Injectable({
  providedIn: 'root',
})
export class StringService implements T_StringRepository {
  getPathFromRoute = (route: T_ApplicationRoute): string => {
    return route.route.path ?? '';
  };
}

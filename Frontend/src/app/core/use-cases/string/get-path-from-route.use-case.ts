import { inject, Injectable } from '@angular/core';
import { IT_STRING_REPOSITORY } from '../../repositories/string.repository';
import { T_ApplicationRoute } from '../../../shared/types-and-interfaces/application-route';

@Injectable({ providedIn: 'root' })
export class UC_String_GetPathFromRoute {
  private readonly stringRepository = inject(IT_STRING_REPOSITORY);

  public execute = (route: T_ApplicationRoute) => {
    return this.stringRepository.getPathFromRoute(route);
  };
}

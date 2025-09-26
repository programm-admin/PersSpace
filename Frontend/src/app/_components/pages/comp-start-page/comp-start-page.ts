import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';

@Component({
    selector: 'app-comp-start-page',
    imports: [NzButtonModule],
    templateUrl: './comp-start-page.html',
    styleUrl: './comp-start-page.scss',
})
export class CompStartPage {
    public router = inject(Router);

    bla = () => {
        this.router.navigateByUrl(APPLICATION_ROUTES.login.route.path ?? '');
    };
}

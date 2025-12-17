import { Component, input, InputSignal } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
    selector: 'app-comp-user-button',
    imports: [NzAvatarModule],
    templateUrl: './comp-user-button.html',
    styleUrl: './comp-user-button.scss',
})
export class CompUserButton {
    // input variables
    public inpButtonContent: InputSignal<string> = input.required<string>();
}

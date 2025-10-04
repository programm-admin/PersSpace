import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-comp-event-form',
    imports: [
        NzInputModule,
        ReactiveFormsModule,
        NzFormModule,
        NzTooltipDirective,
        NzDatePickerModule,
        NzSwitchModule,
        NzButtonModule,
        NzIconModule,
    ],
    templateUrl: './comp-event-form.html',
    styleUrl: './comp-event-form.scss',
})
export class CompEventForm {
    private readonly formBuilder = inject(NonNullableFormBuilder);

    public eventForm = this.formBuilder.group({
        title: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(2)]),
        notes: this.formBuilder.control<string>('', []),
        timeRange: this.formBuilder.control<[Date, Date]>(
            [new Date(), new Date()],
            [Validators.required],
        ),
        isDone: this.formBuilder.control<boolean>(false, [Validators.required]),
    });

    public submitForm = () => {
        if (this.eventForm.invalid) {
            Object.values(this.eventForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            return;
        }

        console.log(
            'event',
            Object.values(this.eventForm.controls).map((c) => c.value),
        );
    };
}

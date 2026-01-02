import { Component, inject, input, InputSignal, OnInit, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { M_MediaEvent } from '../../../../core/models/event.model';

@Component({
    selector: 'app-comp-event-form',
    imports: [
        NzInputModule,
        ReactiveFormsModule,
        NzFormModule,
        NzDatePickerModule,
        NzSwitchModule,
        NzButtonModule,
        NzIconModule,
        NzRadioModule,
    ],
    templateUrl: './comp-event-form.html',
    styleUrl: './comp-event-form.scss',
})
export class CompEventForm implements OnInit {
    private readonly formBuilder = inject(NonNullableFormBuilder);

    // input variables
    // if inpMediaEvent === null: create new event -> otherwise: update existing event
    public inpMediaEvent: InputSignal<M_MediaEvent | null> = input.required<M_MediaEvent | null>();

    // output variables
    public outSubmitForm = output<M_MediaEvent>();
    public outCancelForm = output<void>();

    public eventForm = this.formBuilder.group({
        title: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(2)]),
        notes: this.formBuilder.control<string>('', []),
        timeRange: this.formBuilder.control<[Date, Date]>(
            [new Date(), new Date()],
            [Validators.required],
        ),
        isDone: this.formBuilder.control<boolean>(false, [Validators.required]),
    });

    ngOnInit(): void {
        if (!this.inpMediaEvent()) return;

        this.eventForm = this.formBuilder.group({
            title: this.formBuilder.control<string>(this.inpMediaEvent()!.title, [
                Validators.required,
                Validators.minLength(2),
            ]),
            notes: this.formBuilder.control<string>(this.inpMediaEvent()!.notes, []),
            timeRange: this.formBuilder.control<[Date, Date]>(
                [new Date(this.inpMediaEvent()!.start), new Date(this.inpMediaEvent()!.end)],
                [Validators.required],
            ),
            isDone: this.formBuilder.control<boolean>(this.inpMediaEvent()!.isDone, [
                Validators.required,
            ]),
        });
    }

    public submitForm = (event: SubmitEvent) => {
        event.preventDefault();
        if (this.eventForm.invalid) {
            Object.values(this.eventForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            return;
        }

        const rawValues = this.eventForm.getRawValue();
        const newEvent: M_MediaEvent = {
            id: '',
            userAccountID: '',
            title: rawValues.title,
            notes: rawValues.notes,
            start: rawValues.timeRange[0],
            end: rawValues.timeRange[1],
            isDone: rawValues.isDone,
            eventCreated: new Date(),
        };

        this.outSubmitForm.emit(newEvent);
    };

    public cancelForm = () => {
        this.outCancelForm.emit();
    };
}

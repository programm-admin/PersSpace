import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { M_GeneralEvent } from '../../../../core/models/event.model';
import { convertMediaEventToDisplay } from '../../../../shared/functions/convert-media-event';
import { isContentEmpty } from '../../../../shared/functions/display-content';

@Component({
    selector: 'app-comp-general-event-display-content',
    imports: [],
    templateUrl: './comp-general-event-display-content.html',
    styleUrl: './comp-general-event-display-content.scss',
})
export class CompGeneralEventDisplayContent {
    // input variables
    public inpGeneralEvent: InputSignal<M_GeneralEvent> = input.required<M_GeneralEvent>();

    public displayGeneralEvent: Signal<[string, string][]> = computed(() =>
        convertMediaEventToDisplay(this.inpGeneralEvent()),
    );
    public isStringEmpty = isContentEmpty;
}

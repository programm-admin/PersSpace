import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { M_MediaEvent } from '../../../../core/models/event.model';
import { convertMediaEventToDisplay } from '../../../../shared/functions/convert-media-event';
import { isContentEmpty } from '../../../../shared/functions/display-content';

@Component({
    selector: 'app-comp-media-event-display-content',
    imports: [],
    templateUrl: './comp-media-event-display-content.html',
    styleUrl: './comp-media-event-display-content.scss',
})
export class CompMediaEventDisplayContent {
    // input variables
    public inpMediaEvent: InputSignal<M_MediaEvent> = input.required<M_MediaEvent>();

    public displayMediaEvent: Signal<[string, string][]> = computed(() =>
        convertMediaEventToDisplay(this.inpMediaEvent()),
    );
    public isStringEmpty = isContentEmpty;
}

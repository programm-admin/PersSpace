import { M_GeneralEvent } from '../../core/models/event.model';

export const convertMediaEventToDisplay = (generalEvent: M_GeneralEvent): [string, string][] => {
    return Object.entries({
        Titel: generalEvent.title,
        Notizen: generalEvent.notes,
        Ort: generalEvent.meetingPlace,
        Startdatum: new Date(generalEvent.start).toLocaleDateString(),
        Enddatum: new Date(generalEvent.end).toLocaleDateString(),
        'abgeschlossen?': generalEvent.isDone ? 'ja' : 'nein',
        'erstellt am': new Date(generalEvent.generalEventCreated).toLocaleDateString(),
    });
};

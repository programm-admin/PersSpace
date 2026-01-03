import { M_MediaEvent } from '../../core/models/event.model';

export const convertMediaEventToDisplay = (mediaEvent: M_MediaEvent): [string, string][] => {
    return Object.entries({
        Titel: mediaEvent.title,
        Notizen: mediaEvent.notes,
        Startdatum: new Date(mediaEvent.start).toLocaleDateString(),
        Enddatum: new Date(mediaEvent.end).toLocaleDateString(),
        'abgeschlossen?': mediaEvent.isDone ? 'ja' : 'nein',
        'erstellt am': new Date(mediaEvent.eventCreated).toLocaleDateString(),
    });
};

import { Component } from '@angular/core';

@Component({
    selector: 'app-comp-no-content',
    imports: [],
    template: `
        <div class="noContentContainer">
            <h2><i>Keine Daten vorhanden</i></h2>
        </div>
    `,
    styles: [
        `
            .noContentContainer {
                background-color: white;
                color: black;
                width: 100%;
                height: 10vh;

                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: var(--standard--card--box-shadow);
                border-radius: var(--standard--border--radius);

                h2 {
                    margin: 0;
                    padding: 0;
                    font-weight: normal;
                }
            }
        `,
    ],
})
export class CompNoContent {}

import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-comp-delete-dialog',
    imports: [NzModalModule, NzButtonModule, NzIconModule],
    template: `
        <button nz-button class="deleteBUTTON" nzSize="large" (click)="triggerDelete()">
            <nz-icon nzType="delete" nzTheme="outline" />
            Löschen
        </button>
    `,
    styles: ``,
})
export class CompDeleteDialog {
    // dependency injections
    private readonly modalService = inject(NzModalService);

    // input variables
    public inpTitle: InputSignal<string> = input.required();
    public inpDescription: InputSignal<string> = input.required();

    // output variables
    public outDelete: OutputEmitterRef<boolean> = output();

    public triggerDelete = () => {
        this.modalService.warning({
            nzTitle: this.inpTitle(),
            nzContent: this.inpDescription(),
            nzOkText: 'Löschen',
            nzOkType: 'primary',
            nzOkDanger: true,
            nzOnOk: () => this.outDelete.emit(true),
            nzCancelText: 'Nein',
        });
    };
}

import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { T_LoadingRepository } from '../../../core/repositories/loading.repository';

@Injectable({
    providedIn: 'root',
})
export class LoadingService implements T_LoadingRepository {
    private activeRequests: WritableSignal<number> = signal(0);
    private readonly isLoading: Signal<boolean> = computed(() => this.activeRequests() > 0);

    public showLoading = () => {
        this.activeRequests.update((value: number) => value++);
    };

    public hideLoading = () => {
        this.activeRequests.update((value: number) => (value < 1 ? 0 : value--));
    };

    public getLoading = () => this.isLoading;
}

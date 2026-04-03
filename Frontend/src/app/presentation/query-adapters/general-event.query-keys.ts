export const QKEYS_GeneralEvents = {
    // QKEYS = query keys
    all: ['generalEvents'] as const,
    list: () => [...QKEYS_GeneralEvents.all, 'list'] as const,
    create: () => [...QKEYS_GeneralEvents.all, 'create'] as const,
    update: () => [...QKEYS_GeneralEvents.all, 'update'] as const,
    singleEvent: (id: string) => [...QKEYS_GeneralEvents.all, 'single', id] as const,
};

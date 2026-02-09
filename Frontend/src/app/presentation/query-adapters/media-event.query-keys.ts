export const QKEYS_MediaEvents = {
    // QKEYS = query keys
    all: ['mediaEvents'] as const,
    list: () => [...QKEYS_MediaEvents.all, 'list'] as const,
    create: () => [...QKEYS_MediaEvents.all, 'create'] as const,
    update: () => [...QKEYS_MediaEvents.all, 'update'] as const,
    singleEvent: (id: string) => [...QKEYS_MediaEvents.all, 'single', id] as const,
};

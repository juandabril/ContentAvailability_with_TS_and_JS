
export interface ContentItem {
    identifier: string;
    contentSetId: string;
    contentType: 'digitalasset' | 'question';
    formatType: 'video' | 'document';
    availability: 'never' | 'hide' | 'show' | 'always';
    locked: boolean;
    publishStart?: Date;
    publishEnd?: Date;
}

export interface Level {
    levelType: 'contentset' | 'template' | 'portal';
    contentItems: ContentItem[];
}

export interface FilteringOptions {
    contentType?: 'digitalasset' | 'question';
    formatType?: 'video' | 'document';
}

export function calculateAvailableContent(levels: Level[], options?: FilteringOptions): Map<string, boolean> {
    const availableContent = new Map<string, boolean>();

    const currentTimestamp = new Date();

    for (const level of levels) {
        for (const item of level.contentItems) {
            availableContent.set(item.identifier, false);

            if (item.availability === 'always' || item.availability === 'show') {
                availableContent.set(item.identifier, true);
            }
        }
    }

    return availableContent;
}

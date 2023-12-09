
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
    
    // 2. When building up the "union" of content, a downstream level's settings for a given content item overrides the upstream level -- except as stipulated by other rules
    const availableContent = new Map<string, boolean>();
    const currentTimestamp = new Date('2022-06-29');

    for (const level of levels) {
        for (const item of level.contentItems) {
            // 3. If a content item's availability is never, it is never available, regardless of any downstream level's setting
            availableContent.set(item.identifier, false);

            // 1. If a content item's availability is always or show it is available, otherwise it is not available.
            // 4. If a content item's availability is always, it is always available, regardless of any downstream level's setting
            if (item.availability === 'always' || item.availability === 'show') {
                availableContent.set(item.identifier, true);
            }

            // 5. If a content item is locked, it cannot be overridden by any downstream locked, availability, publish start, or publish end setting
            if (!item.locked) {
                if (item.publishStart && item.publishStart > currentTimestamp) {
                  
                  // 6. If a content item's publish start is specified and it is less than "now" it is not available
                  availableContent.set(item.identifier, false);
                }
                if (item.publishEnd && item.publishEnd < currentTimestamp) {
                  
                  // 7. If a content item's publish end is specified and it is greater than "now" it is not available
                  availableContent.set(item.identifier, false);
                }
            }
        }
    }

    return availableContent;
}
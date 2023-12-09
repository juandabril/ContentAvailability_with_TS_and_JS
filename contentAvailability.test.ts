import { calculateAvailableContent, Level, ContentItem, FilteringOptions } from './contentAvailability'

describe('calculateAvailableContent', () => {
  

  it('should calculate the available content based on the availability option', () => {
    const level1: Level = {
      levelType: 'contentset',
      contentItems: [
        {
          identifier: 'content item 1',
          contentSetId: 'cs1',
          contentType: 'digitalasset',
          formatType: 'video',
          availability: 'always',
          locked: false,
          publishStart: new Date('2022-01-01'),
          publishEnd: new Date('2022-06-30'),
        },
        {
          identifier: 'content item 2',
          contentSetId: 'cs2',
          contentType: 'digitalasset',
          formatType: 'video',
          availability: 'show',
          locked: false,
          publishStart: new Date('2022-01-01'),
          publishEnd: new Date('2022-06-30'),
        },
        {
          identifier: 'content item 3',
          contentSetId: 'cs3',
          contentType: 'digitalasset',
          formatType: 'video',
          availability: 'hide',
          locked: false,
          publishStart: new Date('2022-01-01'),
          publishEnd: new Date('2022-06-30'),
        },
        {
          identifier: 'content item 4',
          contentSetId: 'cs4',
          contentType: 'digitalasset',
          formatType: 'video',
          availability: 'never',
          locked: false,
          publishStart: new Date('2022-01-01'),
          publishEnd: new Date('2022-06-30'),
        },
      ],
    };
    const levels: Level[] = [level1];
  
    const options: FilteringOptions = {
      contentType: 'digitalasset',
      formatType: 'video',
    };
    const availableContent = calculateAvailableContent(levels, options);

    expect(availableContent.size).toBe(4);
    expect(availableContent.get('content item 1')).toBe(true);
    expect(availableContent.get('content item 2')).toBe(true);
    expect(availableContent.get('content item 3')).toBe(false);
    expect(availableContent.get('content item 4')).toBe(false);
  });
});

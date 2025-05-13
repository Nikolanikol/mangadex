interface MangaAttributes {
  title: {
    "ja-ro": string;
  };
  altTitles: Array<Record<string, string>>;
  description: Record<string, string>;
  isLocked: boolean;
  links: Record<string, string>;
  originalLanguage: string;
  lastVolume: string | null;
  lastChapter: string | null;
  publicationDemographic: string;
  status: string;
  year: number;
  contentRating: string;
  tags: Array<{
    id: string;
    type: string;
    attributes: {
      name: Record<string, string>;
      description: Record<string, unknown>;
      group: string;
      version: number;
    };
    relationships: unknown[];
  }>;
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
}

interface MangaRelationship {
  id: string;
  type: string;
}

export interface MangaItem {
  id: string;
  type: string;
  attributes: MangaAttributes;
  relationships: MangaRelationship[];
}

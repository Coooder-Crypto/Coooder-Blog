export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Project {
  type: 'featured' | 'work' | 'self';
  title: LocalizedText;
  description?: LocalizedText;
  problem?: LocalizedText;
  outcome?: LocalizedText;
  contribution?: LocalizedText;
  imgSrc?: string;
  url?: string;
  repo?: string | null;
  builtWith: string[];
}

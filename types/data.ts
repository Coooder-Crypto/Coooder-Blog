export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Project {
  type: 'work' | 'self';
  title: LocalizedText;
  description?: LocalizedText;
  imgSrc: string;
  url?: string;
  repo?: string | null;
  builtWith: string[];
}

// A small selection from the owner's Steam library, not a live activity feed.
export interface GameRecord {
  appId: number;
  title: { zh: string; en: string };
  cover: string;
}

export const steamProfileUrl = 'https://steamcommunity.com/profiles/76561199087286256/';

export const featuredGames: GameRecord[] = [
  {
    appId: 1172470,
    title: { zh: 'Apex Legends', en: 'Apex Legends' },
    cover:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/6cf04767652d703b6050da84b82cfb1194258d7d/header.jpg',
  },
  {
    appId: 730,
    title: { zh: 'Counter-Strike 2', en: 'Counter-Strike 2' },
    cover: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header_schinese.jpg',
  },
  {
    appId: 582010,
    title: { zh: '怪物猎人：世界', en: 'Monster Hunter: World' },
    cover: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/582010/header.jpg',
  },
  {
    appId: 646570,
    title: { zh: '杀戮尖塔', en: 'Slay the Spire' },
    cover: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/646570/header.jpg',
  },
];
export const gameStoreUrl = (appId: number) => `https://store.steampowered.com/app/${appId}/`;

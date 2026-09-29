'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Gamepad2 } from 'lucide-react';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';
import { featuredGames, gameStoreUrl, steamProfileUrl, type GameRecord } from '@/data/gaming';

function GameCard({ game }: { game: GameRecord }) {
  const { language } = useLanguage();
  const [coverFailed, setCoverFailed] = useState(false);
  return (
    <li className="game-card">
      <Link href={gameStoreUrl(game.appId)} className="game-card-link">
        <div className="game-cover">
          {!coverFailed ? (
            <Image
              src={game.cover}
              alt=""
              width={460}
              height={215}
              loading="lazy"
              unoptimized
              onError={() => setCoverFailed(true)}
            />
          ) : (
            <div className="game-cover-fallback" aria-hidden="true">
              <Gamepad2 size={40} />
            </div>
          )}
        </div>
        <div className="game-card-body">
          <h3>{game.title[language]}</h3>
          <ArrowUpRight size={15} aria-hidden="true" />
        </div>
      </Link>
    </li>
  );
}

export default function GamingShelf() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  return (
    <section id="after-hours" className="gaming-shelf" aria-labelledby="gaming-heading">
      <div className="gaming-heading">
        <span className="gaming-doodle" aria-hidden="true">
          <Gamepad2 size={36} />
        </span>
        <div>
          <p className="gaming-kicker">{zh ? '代码之外，再来一局' : 'OFF DUTY. GAME ON.'}</p>
          <h2 id="gaming-heading">{zh ? '我有我的游戏理解' : 'I play my own way.'}</h2>
        </div>
        <Link href={steamProfileUrl} className="text-link">
          {zh ? '在 Steam 找我' : 'Find me on Steam'} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <ul className="game-card-grid">
        {featuredGames.map((game) => (
          <GameCard key={game.appId} game={game} />
        ))}
      </ul>
      <p className="gaming-art-credit">
        {zh
          ? '游戏封面来自 Steam，版权归各自权利人所有。'
          : 'Game artwork via Steam. All artwork belongs to its respective owners.'}
      </p>
    </section>
  );
}

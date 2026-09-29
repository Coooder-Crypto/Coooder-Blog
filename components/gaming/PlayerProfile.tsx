'use client';

import { ArrowUpRight, Gamepad2 } from 'lucide-react';
import Link from '@/components/ui/Link';
import { useLanguage } from '@/lib/i18n';
import { steamProfileUrl } from '@/data/gaming';

export default function PlayerProfile() {
  const { language } = useLanguage();
  const zh = language === 'zh';
  return (
    <section id="player-profile" className="gaming-aside" aria-labelledby="player-heading">
      <span className="gaming-doodle" aria-hidden="true">
        <Gamepad2 size={40} />
      </span>
      <div>
        <h2 id="player-heading">{zh ? '对了，我也打游戏。' : 'Oh, and I play games.'}</h2>
        <p>
          {zh
            ? '组队、狩猎、爬塔、守城——离开编辑器，也有想去的世界。'
            : 'Squad up, hunt monsters, climb the Spire, defend a kingdom. There are worlds beyond the editor, too.'}
        </p>
        <Link href={steamProfileUrl} className="text-link">
          {zh ? '在 Steam 遇见我' : 'See you on Steam'} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

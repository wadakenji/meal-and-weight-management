'use client';

import { FC, useState } from 'react';
import { IconChevronDown } from '@/components/icon/chevron-down';
import clsx from 'clsx';
import { IconPenToSquare } from '@/components/icon/pen-to-square';
import { IconUser } from '@/components/icon/user';
import { IconLineChart } from '@/components/icon/line-chart';

const ITEMS = [
  {
    href: '/register',
    text: 'データ登録',
    icon: <IconPenToSquare />,
  },
  {
    href: '/data-view',
    text: 'グラフ表示',
    icon: <IconLineChart />,
  },
  {
    href: '/user-settings',
    text: 'ユーザー設定',
    icon: <IconUser />,
  },
];

export const NavigationMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="flex items-center gap-8px"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-sm">メニュー</span>
        <IconChevronDown />
      </button>
      <nav
        className={clsx(
          'absolute right-0 top-full translate-y-8px rounded border border-line bg-white px-16px py-8px',
          !isOpen && 'hidden',
        )}
      >
        <ul>
          {ITEMS.map(({ href, text, icon }) => (
            <li key={href}>
              <a
                href={href}
                className="flex min-h-min-button-size items-center gap-8px whitespace-nowrap text-sm text-text-gray transition-opacity hover:opacity-70"
              >
                {icon}
                <span>{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

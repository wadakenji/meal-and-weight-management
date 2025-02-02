'use client';

import { FC, useState } from 'react';
import { IconChevronDown } from '@/components/icon/chevron-down';
import clsx from 'clsx';
import { IconPenToSquare } from '@/components/icon/pen-to-square';
import { IconLineChart } from '@/components/icon/line-chart';
import { VERSION } from '@/constants/version';
import { IconHouse } from '@/components/icon/house';
import { SignOutButton } from '@/app/(authenticated)/_components/sign-out-button/sign-out-button';
import { IconGear } from '@/components/icon/gear';

const ITEMS = [
  {
    href: '/dashboard',
    text: 'ホーム',
    icon: <IconHouse />,
  },
  {
    href: '/data-view',
    text: 'データ表示',
    icon: <IconLineChart />,
  },
  {
    href: '/register',
    text: 'データ登録',
    icon: <IconPenToSquare />,
  },
  {
    href: '/settings',
    text: '設定',
    icon: <IconGear />,
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
      <div
        className={clsx(
          'absolute right-0 top-full translate-y-8px space-y-8px rounded border border-line bg-white px-16px py-8px',
          !isOpen && 'hidden',
        )}
      >
        <nav>
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
        <SignOutButton className="w-[150px]" />
        <div className="text-right text-sm font-bold text-text-default">
          {VERSION}
        </div>
      </div>
    </div>
  );
};

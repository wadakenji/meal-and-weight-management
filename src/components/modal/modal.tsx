'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = PropsWithChildren<{
  isOpen: boolean;
  close: () => void;
}>;

export const Modal: FC<Props> = ({ isOpen, close, children }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <div
      onClick={close}
      className="fixed left-0 top-0 z-modal flex size-full items-center p-16px backdrop-brightness-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full overflow-y-scroll rounded-lg bg-white p-16px"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

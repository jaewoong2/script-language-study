import React, { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

const Footer = ({ children }: PropsWithChildren) => {
  return (
    <footer
      className={cn(
        'tw-sticky tw-bottom-0 tw-z-[22] tw-w-full tw-rounded-b-3xl tw-bg-white tw-bg-opacity-50 tw-py-4 tw-backdrop-blur-sm',
        'tw-flex tw-items-center tw-justify-end tw-gap-4 tw-px-20',
        'tw-border-t',
      )}
    >
      <a
        className="tw-w-fit tw-text-primary"
        href="https://naver.me/5wWu4h6f"
        referrerPolicy="no-referrer"
        target="_blank"
      >
        {children}
      </a>
    </footer>
  );
};

export default Footer;

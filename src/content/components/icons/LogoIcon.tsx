import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Props = React.SVGProps<SVGSVGElement>;

const LogoIcon = ({ className, ...props }: Props) => {
  return (
    <Avatar
      className={cn(
        'tw-h-full tw-w-full tw-rotate-[-10deg] tw-rounded-none tw-p-3',
        className,
      )}
    >
      <AvatarImage
        className="tw-object-contain"
        src="https://images.prlc.kr/images/ram.png"
        alt="@shadcn"
      />
      <AvatarFallback className="tw-font-LilitaOne tw-bg-transparent tw-text-xs tw-font-semibold tw-text-orange-500 tw-drop-shadow-[1px_1px_1px_#606060da]">
        O3O
      </AvatarFallback>
    </Avatar>
  );
};

export default LogoIcon;

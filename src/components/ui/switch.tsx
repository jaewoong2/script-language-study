import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const sizeClasses = {
  small: {
    root: 'tw-h-4 tw-w-7',
    thumb:
      'tw-h-3 tw-w-3 data-[state=unchecked]:tw-translate-x-0 data-[state=checked]:tw-translate-x-4',
  },
  medium: {
    root: 'tw-h-5 tw-w-9',
    thumb:
      'tw-h-4 tw-w-4 data-[state=unchecked]:tw-translate-x-0 data-[state=checked]:tw-translate-x-5',
  },
  large: {
    root: 'tw-h-6 tw-w-11',
    thumb:
      'tw-h-5 tw-w-5 data-[state=unchecked]:tw-translate-x-0 data-[state=checked]:tw-translate-x-5',
  },
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<
    typeof SwitchPrimitives.Root
  > & {
    size?: 'small' | 'medium' | 'large';
  }
>(({ className, size = 'medium', ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'tw-peer tw-inline-flex tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-shadow-sm tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input',
      sizeClasses[size].root,
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'tw-pointer-events-none tw-block tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform',
        sizeClasses[size].thumb,
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

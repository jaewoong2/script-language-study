import { cn } from '@/lib/utils';

type Props = JSX.IntrinsicElements['div'];

const SpinnerIcon = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'tw-h-12 tw-w-12 tw-animate-spin tw-rounded-md tw-border-4 tw-border-t-4 tw-border-indigo-400',
        className,
      )}
      {...props}
    ></div>
  );
};

export default SpinnerIcon;

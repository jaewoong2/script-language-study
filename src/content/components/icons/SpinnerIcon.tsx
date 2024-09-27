import { cn } from "@/lib/utils";

type Props = JSX.IntrinsicElements["div"];

const SpinnerIcon = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "tw-border-indigo-400 tw-rounded-md tw-h-12 tw-w-12 tw-border-4 tw-border-t-4 tw-animate-spin",
        className
      )}
      {...props}
    ></div>
  );
};

export default SpinnerIcon;

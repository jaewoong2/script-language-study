import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = React.SVGProps<SVGSVGElement>;

const LogoIcon = ({ ...props }: Props) => {
  return (
    <Avatar className="!tw-w-full tw-h-full tw-rounded-none tw-p-4">
      <AvatarImage
        className="tw-object-contain"
        // className="tw-object-contain tw-drop-shadow-[1px_1px_1px_#606060da]"
        src="https://images.prlc.kr/images/ghost343.png"
        alt="@shadcn"
      />
      <AvatarFallback className="tw-font-Playwrite tw-text-xs tw-bg-transparent tw-drop-shadow-[1px_1px_1px_#606060da] tw-text-orange-500 tw-font-semibold">
        O3O
      </AvatarFallback>
    </Avatar>
  );
};

export default LogoIcon;

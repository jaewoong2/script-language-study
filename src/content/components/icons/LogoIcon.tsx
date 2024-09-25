import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = React.SVGProps<SVGSVGElement>;

const LogoIcon = ({ ...props }: Props) => {
  return (
    <Avatar className="!tw-w-full tw-h-full tw-rounded-none tw-p-4">
      <AvatarImage
        className="tw-object-contain tw-drop-shadow-[1px_1px_1px_#606060da]"
        src="https://images.prlc.kr/images/ytb-logo.png"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default LogoIcon;

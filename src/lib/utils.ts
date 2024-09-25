import { clsx, type ClassValue } from "clsx";
import { twJoin, twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twJoin(clsx(inputs));
}

function parseClassName(className: string): string {
  if (className.startsWith("tw")) return className;

  if (className.includes(":")) {
    const [prefix, cn] = className.split(":");
    return `${prefix}:${parseClassName(cn)}`;
  }

  return `tw-${className}`;
}

export function cnWithPrefix(...inputs: ClassValue[]) {
  const className = twMerge(
    clsx(
      inputs.map((input) => {
        return input?.toString().split(" ").map(parseClassName).join(" ");
      })
    )
  );
  return className;
}

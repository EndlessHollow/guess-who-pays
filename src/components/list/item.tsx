import { cn } from "@utils/cn";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export function Item(props: Props) {
  const { children, className } = props;

  return <li className={cn("p-4", className)}>{children}</li>;
}

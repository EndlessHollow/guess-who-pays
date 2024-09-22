import { cn } from "@utils/cn";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Root(props: Props) {
  const { children, className } = props;

  return <ul className={cn("grid", className)}>{children}</ul>;
}

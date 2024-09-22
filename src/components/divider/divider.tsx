import { cn } from "@utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLHRElement> &
  VariantProps<typeof dividerVariants>;

export function Divider(props: Props) {
  const { direction, className } = props;
  return <hr className={cn(dividerVariants({ direction, className }))} />;
}

const dividerVariants = cva(
  "h-px bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent",
  {
    variants: {
      direction: {
        horizontal: "",
        vertical: "",
      },
    },
    defaultVariants: {
      direction: "horizontal",
    },
  },
);

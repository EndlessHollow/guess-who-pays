import { cn } from "@utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof avatarVariants> & {
    children: ReactNode;
  };

export function Avatar(props: Props) {
  const { variant, size, children, className } = props;

  return (
    <span className={cn(avatarVariants({ variant, size, className }))}>
      {children}
    </span>
  );
}

const avatarVariants = cva("flex justify-center items-center bg-gray-200", {
  variants: {
    variant: {
      rounded: "rounded-md",
      circle: "rounded-full",
    },
    size: {
      small: "w-12 h-12",
      base: "w-16 h-16",
    },
  },
  defaultVariants: {
    variant: "rounded",
    size: "base",
  },
});

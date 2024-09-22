import { cn } from "@utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button(props: Props) {
  const { onClick, children, className, variant, size, radius } = props;
  return (
    <button
      onClick={onClick}
      className={cn(buttonVariants({ variant, size, radius, className }))}
    >
      {children}
    </button>
  );
}

const buttonVariants = cva("all font-medium text-white", {
  variants: {
    variant: {
      solid:
        "bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300",
      outline:
        "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100",
    },
    size: {
      "1": "h-6 text-xs px-2",
      "2": "h-8 text-sm px-3",
      "3": "h-10 text-base px-4",
    },
    radius: {
      none: "rounded-none",
      small: "rounded-sm",
      medium: "rounded-md",
      large: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "3",
    radius: "large",
  },
});

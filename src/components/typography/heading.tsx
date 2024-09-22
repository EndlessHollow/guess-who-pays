import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { fontWeightTokens, textAlignmentTokens } from "./tokens";
import { THeadingTag } from "./types";
import { cn } from "@utils/cn";

type Props = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: THeadingTag;
  };

export function Heading(props: Props) {
  const {
    as: Tag = "h1",
    size,
    weight,
    color,
    align,
    type,
    className,
    children,
  } = props;

  return (
    <Tag
      className={cn(
        headingVariants({ size, weight, color, align, type, className }),
      )}
    >
      {children}
    </Tag>
  );
}

const headingVariants = cva("text-gray-800", {
  variants: {
    type: {
      h1: "text-4xl font-bold",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-medium",
      h4: "text-lg font-semibold",
    },
    size: {
      "4xl": "text-4xl",
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      lg: "text-lg",
    },
    weight: fontWeightTokens,
    color: {
      primary: "text-black",
    },
    align: textAlignmentTokens,
  },
  defaultVariants: {
    type: "h1",
  },
});

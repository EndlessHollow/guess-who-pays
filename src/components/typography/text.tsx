import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { fontWeightTokens, textAlignmentTokens } from "./tokens";
import { TTextTag } from "./types";
import { cn } from "@utils/cn";

type Props = HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    as?: TTextTag;
  };

export function Text(props: Props) {
  const {
    as: Tag = "p",
    size,
    weight,
    color,
    align,
    className,
    children,
  } = props;

  return (
    <Tag
      className={cn(textVariants({ size, weight, color, align, className }))}
    >
      {children}
    </Tag>
  );
}

const textVariants = cva(null, {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
    },
    weight: fontWeightTokens,
    color: {
      primary: "text-slate-600",
      secondary: "text-slate-500",
      error: "text-red-500",
    },
    align: textAlignmentTokens,
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "primary",
    align: "left",
  },
});

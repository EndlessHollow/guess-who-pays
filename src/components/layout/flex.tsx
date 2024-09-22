import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { TCommonProperties } from "./types";
import { alignTokens, gapTokens, justifyTokens } from "./tokens";
import { cn } from "@utils/cn";

type Props = HTMLAttributes<HTMLDivElement> &
  TCommonProperties &
  VariantProps<typeof flexVariants>;

export function Flex(props: Props) {
  const {
    children,
    className,
    height,
    width,
    display,
    direction,
    justify,
    align,
    wrap,
    gap,
  } = props;

  return (
    <div
      className={cn(
        flexVariants({
          display,
          direction,
          justify,
          align,
          wrap,
          gap,
        }),
        width,
        height,
        className,
      )}
    >
      {children}
    </div>
  );
}

const flexVariants = cva(null, {
  variants: {
    display: {
      flex: "flex",
      "inline-flex": "inline-flex",
    },
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    wrap: {
      "no-wrap": "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    justify: justifyTokens,
    align: alignTokens,
    gap: gapTokens,
  },
  defaultVariants: {
    display: "flex",
  },
});

"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

type TButtonWidgetProps = React.ComponentProps<"button"> &
  React.ComponentProps<typeof buttonVariants> & {
    btnText?: string | React.ReactNode;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
    loading?: boolean;
  };

export function ButtonWidget({
  startIcon,
  endIcon,
  btnText,
  className,
  loading,
  size,
  ...rest
}: TButtonWidgetProps) {
  const isNotIcon = size !== "icon" && size !== "icon-sm" && size !== "icon-lg";

  return (
    <Button {...rest} size={size} className={cn("relative", className)}>
      {startIcon && !loading && startIcon}
      {loading && <LoaderCircle className='animate-spin' />}
      {btnText && isNotIcon && btnText}
      {endIcon && isNotIcon && endIcon}
    </Button>
  );
}

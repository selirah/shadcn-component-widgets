"use client";

import { PropsWithChildren, ReactNode, ComponentProps } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  alertVariants,
} from "@/components/ui/alert";

type TAlertProps = ComponentProps<typeof alertVariants> &
  PropsWithChildren<{
    title: string | ReactNode;
    icon?: ReactNode;
  }>;

export function AlertWidget({
  children,
  title,
  icon,
  variant,
  className,
  ...rest
}: TAlertProps) {
  return (
    <Alert variant={variant} {...rest}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

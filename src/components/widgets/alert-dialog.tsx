"use client";

import { PropsWithChildren } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type TAlertDialogWidgetProps = PropsWithChildren<{
  header?: string | React.ReactNode;
  description: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  actionText?: string | React.ReactNode;
  onAction?: () => void;
}>;

export function AlertDialogWidget({
  header,
  description,
  cancelText,
  actionText,
  onAction,
  children,
}: TAlertDialogWidgetProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText || "Cancel"}</AlertDialogCancel>
          {actionText && onAction && (
            <AlertDialogAction onClick={onAction}>
              {actionText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { MouseEvent } from "react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { XCircleIcon } from "lucide-react";

type TBadgeWidgetProps = React.ComponentProps<typeof badgeVariants> & {
  label: string | React.ReactNode;
  onRemove?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  icon?: React.ReactNode;
  className?: string;
};

export function BadgeWidget({
  label,
  icon,
  onRemove,
  variant,
  className,
  ...rest
}: TBadgeWidgetProps) {
  return (
    <Badge variant={variant} className={className} {...rest}>
      {icon}
      {label}
      {onRemove && (
        <button className='cursor-pointer' onClick={(e) => onRemove(e)}>
          <XCircleIcon className='w-3 h-3' />
        </button>
      )}
    </Badge>
  );
}

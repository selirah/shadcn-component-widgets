"use client";

import { ReactNode, ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TInputWidgetProps = ComponentProps<"input"> & {
  icon?: ReactNode;
};

export function InputWidget({ icon, ...rest }: TInputWidgetProps) {
  return (
    <div className='relative w-full'>
      {icon && (
        <div className='absolute left-3 top-2.5 [&_svg]:size-4 [&_svg]:text-muted-foreground'>
          {icon}
        </div>
      )}
      <Input {...rest} className={cn("", icon && "pl-8")} />
    </div>
  );
}

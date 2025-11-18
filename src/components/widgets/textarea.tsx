"use client";

import { ReactNode, ComponentProps } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type TTextareaWidgetProps = ComponentProps<"textarea"> & {
  icon?: ReactNode;
};

export function TextareaWidget({ icon, ...rest }: TTextareaWidgetProps) {
  return (
    <div className='relative w-full'>
      {icon && (
        <div className='absolute left-3 top-2.5 [&_svg]:size-4'>{icon}</div>
      )}
      <Textarea {...rest} className={cn("", icon && "pl-8")} />
    </div>
  );
}

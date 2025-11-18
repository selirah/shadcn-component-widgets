"use client";

import { PropsWithChildren, ReactNode } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AvatarWidget } from "@/components/widgets/avatar";
import { cn } from "@/lib/utils";

type TSwitchWidgetProps = PropsWithChildren<{
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string | ReactNode;
  position?: "left" | "right";
  variant?: "default" | "card";
  id?: string;
  imgSrc?: string;
  imgAlt?: string;
  imgFallbackText?: string;
  className?: string;
}>;

export function SwitchWidget({
  label,
  onChange,
  position = "left",
  value,
  id = "switch-widget",
  imgSrc,
  imgAlt,
  imgFallbackText,
  variant = "default",
  children,
  className,
}: TSwitchWidgetProps) {
  const avatar = imgFallbackText && (
    <AvatarWidget
      altText={imgAlt}
      fallbackText={imgFallbackText}
      imageSrc={imgSrc}
    />
  );
  return (
    <div className='flex flex-col gap-1 w-full'>
      <div
        className={cn("flex gap-2 flex-row", {
          "bg-card text-card-foreground border p-4 rounded-md shadow-xs":
            variant === "card",
          "items-center": !children,
        })}
      >
        {position === "right" && avatar}
        <Switch
          id={id}
          checked={value}
          onCheckedChange={onChange}
          className={cn("", {
            "order-last": position == "right",
            className,
          })}
        />
        <div className='flex flex-1 items-center justify-between gap-2'>
          <div className='flex flex-col gap-1'>
            {label && (
              <Label className='font-semibold' htmlFor={id}>
                {label}
              </Label>
            )}
            {children}
          </div>
        </div>
        {position === "left" && avatar}
      </div>
    </div>
  );
}

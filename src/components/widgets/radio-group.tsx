"use client";

import { PropsWithChildren } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AvatarWidget } from "@/components/widgets/avatar";
import { cn } from "@/lib/utils";
import { TOption } from "@/types/generic";

type TRadioGroupWidgetProps = {
  label?: string;
  options: TOption[];
  variant?: "default" | "card";
  position?: "left" | "right";
  orientation?: "vertical" | "horizontal";
  gridCols?: string;
  idPrefix?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function RadioGroupWidget({
  label,
  value,
  onChange,
  gridCols = "",
  idPrefix = "radio-group",
  orientation = "vertical",
  position = "left",
  options,
  variant = "default",
  className,
  ...rest
}: TRadioGroupWidgetProps) {
  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && <Label className='font-medium'>{label}</Label>}
      <RadioGroup
        defaultValue={value}
        onValueChange={onChange}
        orientation={orientation}
        gridCols={gridCols}
        {...rest}
      >
        {options.map((option) => {
          const avatar = option?.imgFallbackText && (
            <AvatarWidget
              altText={option?.imgAlt}
              fallbackText={option?.imgFallbackText}
              imageSrc={option?.imgSrc}
            />
          );

          return (
            <div
              key={option?.value}
              className={cn("flex gap-2 flex-row", {
                "bg-card text-card-foreground border p-4 rounded-md shadow-xs":
                  variant === "card",
                "items-center": !option?.description,
              })}
            >
              {position === "right" && avatar}
              <RadioGroupItem
                id={`${idPrefix}-${option?.value}`}
                value={option?.value}
                className={cn("", {
                  "order-last": position == "right",
                  className,
                })}
              />
              <div className='flex flex-1 items-center justify-between gap-2'>
                <div className='flex flex-col gap-1'>
                  <Label
                    className='font-semibold'
                    htmlFor={`${idPrefix}-${option?.value}`}
                  >
                    {option?.label}
                  </Label>
                  {option?.description && (
                    <p className='text-muted-foreground text-xs'>
                      {option?.description}
                    </p>
                  )}
                </div>
              </div>
              {position === "left" && avatar}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

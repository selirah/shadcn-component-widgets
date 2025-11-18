"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AvatarWidget } from "@/components/widgets/avatar";
import { cn } from "@/lib/utils";
import { TOption } from "@/types/generic";

type TCheckboxGroupWidgetProps = {
  label?: string;
  options: TOption[];
  variant?: "default" | "card";
  position?: "left" | "right";
  orientation?: "vertical" | "horizontal";
  gridCols?: string;
  idPrefix?: string;
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
};

export function CheckboxGroupWidget({
  label,
  value,
  onChange,
  gridCols = "",
  idPrefix = "checkbox-group",
  orientation = "vertical",
  position = "left",
  options,
  variant = "default",
  className,
}: TCheckboxGroupWidgetProps) {
  const layoutClass =
    orientation === "horizontal" ? cn("grid gap-2", gridCols) : "grid gap-2";

  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && <Label className='font-medium'>{label}</Label>}
      <div className={cn("w-full", layoutClass)}>
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
              <Checkbox
                id={`${idPrefix}-${option?.value}`}
                checked={value?.includes(option.value)}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...(value || []), option.value]
                    : (value || []).filter((item) => item !== option.value);
                  onChange(newValue);
                }}
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
      </div>
    </div>
  );
}

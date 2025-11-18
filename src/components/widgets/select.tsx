"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOption } from "@/types/generic";

type TSelectWidgetProps = {
  options: TOption[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string | React.ReactNode;
  listLabel?: string | React.ReactNode;
};

export function SelectWidget({
  onChange,
  options,
  value,
  icon,
  placeholder,
  listLabel,
}: TSelectWidgetProps) {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <div className='flex items-center gap-2'>
          {icon}
          <SelectValue placeholder={placeholder ?? "Select ..."} />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{listLabel}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option?.value} value={option?.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

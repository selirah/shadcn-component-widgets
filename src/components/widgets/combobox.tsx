"use client";

import { useState, useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TOption } from "@/types/generic";

type TComboboxWidgetProps = {
  options: TOption[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string | React.ReactNode;
};

export function ComboboxWidget({
  onChange,
  options,
  value,
  icon,
  placeholder,
}: TComboboxWidgetProps) {
  const [open, setOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground'>{icon}</span>
            {value ? (
              options.find((option) => option.value === value)?.label
            ) : (
              <span className='text-muted-foreground'>
                {placeholder ?? "Select ..."}
              </span>
            )}
          </div>
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder='Search ...' className='h-9' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <ScrollArea ref={scrollAreaRef} className='pui-h-72'>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option?.value}
                    value={option?.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    {option?.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { useState, useRef, KeyboardEvent } from "react";
import {
  CheckIcon,
  XIcon,
  ChevronDownIcon,
  LoaderCircleIcon,
} from "lucide-react";
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
import { BadgeWidget } from "@/components/widgets/badge";
import { Separator } from "@/components/ui/separator";

type TMultiComboboxWidgetProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string | React.ReactNode;
  maxCount?: number;
  modalPopover?: boolean;
  loading?: boolean;
};

export function MultiCombobox({
  onChange,
  options,
  values,
  placeholder,
  maxCount = options.length,
  modalPopover = false,
  loading = false,
}: TMultiComboboxWidgetProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(values);
  const [open, setOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      setOpen(true);
    } else if (event.key === "Backspace" && selectedValues.length) {
      const newValues = selectedValues.slice(0, -1);
      setSelectedValues(newValues);
      onChange(newValues);
    }
  };

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onChange([]);
  };

  const handleTogglePopover = () => {
    setOpen((prev) => !prev);
  };

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const toggleAll = () => {
    if (selectedValues.length === options.length) {
      handleClear();
    } else {
      const allValues = options.map((option) => option.value);
      setSelectedValues(allValues);
      onChange(allValues);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modalPopover}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {selectedValues.length > 0 ? (
            <div className='flex justify-between items-center w-full'>
              <div className='flex flex-wrap items-center'>
                {selectedValues.slice(0, maxCount).map((value) => {
                  const option = options.find((o) => o.value === value);
                  return (
                    <BadgeWidget
                      key={value}
                      icon={option?.icon}
                      label={option?.label}
                      onRemove={(e) => {
                        e.stopPropagation();
                        toggleOption(value);
                      }}
                      className='mr-1'
                    />
                  );
                })}
                {selectedValues.length > maxCount && (
                  <BadgeWidget
                    label={`+${selectedValues.length - maxCount} more`}
                    onRemove={(e) => {
                      e.stopPropagation();
                      clearExtraOptions();
                    }}
                  />
                )}
              </div>
              <div className='flex items-center justify-between gap-1'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className='cursor-pointer'
                >
                  <XIcon className='w-2 h-2 opacity-50' />
                </button>
                <Separator
                  orientation='vertical'
                  className='flex min-h-6 h-full'
                />
                <div className='flex items-center gap-2'>
                  {loading && <LoaderCircleIcon className='animate-spin' />}
                  <ChevronDownIcon className='opacity-50' />
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-between w-full mx-auto'>
              <span>{placeholder}</span>
              <ChevronDownIcon className='opacity-50' />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' onEscapeKeyDown={() => setOpen(false)}>
        <Command>
          <CommandInput
            placeholder='Search ...'
            className='h-9'
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <ScrollArea ref={scrollAreaRef} className='pui-h-72'>
              <CommandGroup>
                <CommandItem
                  key='all'
                  onSelect={toggleAll}
                  className='cursor-pointer'
                >
                  <div
                    className={cn(
                      "mr-1 flex h-5 w-5 items-center justify-center rounded-sm border",
                      selectedValues.length !== options.length &&
                        "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <CheckIcon className='h-3 w-3 text-primary' />
                  </div>
                  <span>Select All</span>
                </CommandItem>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option?.value);
                  return (
                    <CommandItem
                      key={option?.value}
                      value={`${option?.label} ${option?.value}`}
                      onSelect={() => toggleOption(option?.value)}
                      className='cursor-pointer'
                    >
                      <div
                        className={cn(
                          "mr-1 flex h-5 w-5 items-center justify-center rounded-sm border",
                          !isSelected && "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className='h-3 w-3 text-primary' />
                      </div>
                      {option?.icon}
                      <span>{option?.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

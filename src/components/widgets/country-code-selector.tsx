"use client";

import * as React from "react";
import { getCountryOptions } from "@/utils/index";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ButtonWidget } from "@/components/widgets/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

const countryOptions = getCountryOptions();

type TCountryCodeSelectorWidgetProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string | React.ReactNode;
};

export function CountryCodeSelectorWidget({
  onChange,
  value,
  placeholder,
}: TCountryCodeSelectorWidgetProps) {
  const [open, setOpen] = React.useState(false);
  const scrollAreaRef = React.useRef(null);

  const currentLabel = countryOptions.find((o) => o.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonWidget
          variant='outline'
          aria-expanded={open}
          btnText={value ? currentLabel : placeholder ?? "Select a country"}
          endIcon={<ChevronDownIcon />}
          className='w-full flex justify-between items-center'
        />
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder='Search . . .' />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className='h-72'>
              <CommandGroup>
                {countryOptions.map((country) => (
                  <CommandItem
                    key={country?.value}
                    value={country?.value}
                    onSelect={() => {
                      onChange(country?.value);
                      setOpen(false);
                    }}
                    aria-label={country?.label}
                  >
                    {country.label}
                    {value === country.value && (
                      <CheckIcon className='ml-auto h-4 w-4' />
                    )}
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

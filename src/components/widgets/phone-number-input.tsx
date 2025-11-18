"use client";

import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import type { CountryCode } from "libphonenumber-js/core";
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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

type TFlagComponentProps = {
  country: CountryCode;
  countryName: string;
};

type TCountrySelectOptionProps = {
  country: CountryCode;
  countryName: string;
  selectedCountry: string;
  onChange: (value: string) => void;
  onSelectComplete: VoidFunction;
};

type TCountrySelectProps = {
  value: CountryCode;
  options: { value: CountryCode; label: string }[];
  onChange: (value: string) => void;
};

type TPhoneNumberInputWidgetProps = {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

function PhoneNumberInputWidgetBase(
  { onChange, value, className, ...rest }: TPhoneNumberInputWidgetProps,
  ref: any
) {
  const InputWithInjectedColor = React.useMemo(
    () =>
      React.forwardRef((inputProps, inputRef) => (
        <Input
          ref={inputRef as any}
          {...inputProps}
          className={cn("rounded-e-lg rounded-s-none")}
        />
      )),
    []
  );

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <RPNInput.default
      ref={ref}
      className={cn("flex w-full", className)}
      flagComponent={FlagComponent}
      countrySelectComponent={(selectProps) => (
        <CountrySelect {...selectProps} {...rest} />
      )}
      inputComponent={InputWithInjectedColor}
      onChange={(value) => onChange(value as string)}
      defaultCountry='US'
      {...rest}
    />
  );
}

function CountrySelect({ onChange, options, value }: TCountrySelectProps) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <ButtonWidget
          variant='outline'
          btnText={<FlagComponent country={value} countryName={value} />}
          endIcon={<ChevronDownIcon />}
          className='flex justify-between items-center rounded-e-none rounded-s-lg border-r-0'
        />
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-0'>
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                const viewportElement = scrollAreaRef.current?.querySelector(
                  "[data-radix-scroll-area-viewport]"
                );
                if (viewportElement) {
                  viewportElement.scrollTop = 0;
                }
              }, 0);
            }}
            placeholder='Search country...'
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className='h-72'>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={value}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CountrySelectOption({
  country,
  countryName,
  onChange,
  onSelectComplete,
  selectedCountry,
}: TCountrySelectOptionProps) {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className='gap-2' onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className='flex-1 text-sm'>{countryName}</span>
      <span className='text-sm'>
        {`+${RPNInput.getCountryCallingCode(country)}`}
      </span>
      <CheckIcon
        className={cn(
          "ml-auto size-4",
          country === selectedCountry ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
}

function FlagComponent({ country, countryName }: TFlagComponentProps) {
  const Flag = flags[country];

  return (
    <div className='flex items-center gap-1'>
      <span
        className={cn(
          "flex h-4 w-6 overflow-hidden rounded-sm bg-background [&_svg:not([class*='size-'])]:size-full"
        )}
      >
        {Flag && <Flag title={countryName} />}
      </span>
      <span className='text-sm'>
        {`+${RPNInput.getCountryCallingCode(country)}`}
      </span>
    </div>
  );
}

export const PhoneNumberInputWidget = React.forwardRef<
  any,
  TPhoneNumberInputWidgetProps
>(PhoneNumberInputWidgetBase);

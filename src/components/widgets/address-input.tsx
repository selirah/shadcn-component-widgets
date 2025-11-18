"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, MapPinCheckIcon } from "lucide-react";
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
import { TAddress } from "@/types/generic";
import { useGoogleReady } from "@/hooks/use-google-ready";

type TAddressInputWidgetProps = {
  value: TAddress;
  onChange: (value: TAddress) => void;
  placeholder?: string | React.ReactNode;
};

type TMapService = {
  autocomplete: google.maps.places.AutocompleteService | null;
  places: google.maps.places.PlacesService | null;
};

const mapsServices: TMapService = {
  autocomplete: null,
  places: null,
};

export function AddressInputWidget({
  onChange,
  value,
  placeholder,
}: TAddressInputWidgetProps) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [localValue, setLocalValue] = useState(value?.formattedAddress || "");
  const [open, setOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(
    null
  );
  const isGoogleReady = useGoogleReady();

  useEffect(() => {
    if (!isGoogleReady) return;

    let t = tokenRef.current;
    if (!t) {
      t = new (google.maps.places as any).AutocompleteSessionToken();
      tokenRef.current = t;
    }
    return () => {
      tokenRef.current = null;
    };
  }, [isGoogleReady]);

  useEffect(() => {
    let canceled = false;
    (async () => {
      if (!localValue || localValue.trim().length < 3) {
        setOptions([]);
        return;
      }

      const { AutocompleteSuggestion } = await (
        google.maps as any
      ).importLibrary("places");

      const { suggestions } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: localValue,
          sessionToken: tokenRef.current ?? undefined,
          language: "en",
        });

      if (canceled) return;

      const mapped = (suggestions ?? [])
        .map(
          (s: google.maps.places.AutocompleteSuggestion) => s.placePrediction
        )
        .filter(Boolean)
        .map((p: google.maps.places.PlacePrediction) => ({
          label: [
            p.mainText?.toString?.() ?? "",
            p.secondaryText?.toString?.() ?? "",
          ]
            .filter(Boolean)
            .join(", "),
          value: p.placeId,
        }));

      setOptions(mapped);
    })().catch(() => {
      if (!canceled) setOptions([]);
    });
  }, [localValue]);

  const handleSelect = async (placeId: string) => {
    if (!placeId) return;

    const { Place } = await (google.maps as any).importLibrary("places");
    const place: google.maps.places.Place = new Place({ id: placeId });

    await place.fetchFields({
      fields: ["id", "formattedAddress", "displayName", "addressComponents"],
    });

    const comps = (place as any).addressComponents as
      | google.maps.places.AddressComponent[]
      | undefined;

    const parsed: TAddress = {
      placeId: (place as any).id ?? placeId,
      formattedAddress: (place as any).formattedAddress ?? "",
      name: (place as any).displayName?.text ?? "",
      street: "",
      city: "",
      country: "",
      postalCode: "",
      region: "",
    };

    if (comps) {
      for (const c of comps) {
        const t = c.types;
        if (t.includes("street_number"))
          parsed.street = `${c.longText} ${parsed.street}`.trim();
        else if (t.includes("route"))
          parsed.street = `${parsed.street} ${c.longText}`.trim();
        else if (t.includes("locality")) parsed.city = c.longText;
        else if (t.includes("administrative_area_level_1"))
          parsed.region = c.shortText;
        else if (t.includes("country")) parsed.country = c.longText;
        else if (t.includes("postal_code")) parsed.postalCode = c.longText;
      }
    }

    onChange(parsed);
    setOpen(false);
  };

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
            <MapPinCheckIcon />
            {value?.formattedAddress ?? placeholder ?? "Enter Address ..."}
          </div>
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search ...'
            className='h-9'
            onValueChange={setLocalValue}
            value={localValue}
          />
          <CommandEmpty className='flex justify-center items-center flex-col gap-2 p-4'>
            <MapPinCheckIcon className='h-6 w-6 text-foreground' />
            <span className='text-sm text-foreground'>
              Start typing an address to search
            </span>
          </CommandEmpty>
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className='pui-h-72'>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option?.value}
                    value={option?.value}
                    onSelect={handleSelect}
                  >
                    {option?.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value?.placeId === option?.value
                          ? "opacity-100"
                          : "opacity-0"
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

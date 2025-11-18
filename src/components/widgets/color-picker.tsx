"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

type TColorPickerWidgetProps = {
  value: string;
  onChange: (value: string) => void;
};

function parseToHex(color: string) {
  color = color.trim().toLowerCase();
  if (color.startsWith("#")) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    return `#${hex}`;
  }

  const rgbMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch;
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  throw new Error(`Unsupported color format: ${color}`);
}

export function ColorPickerWidget({
  value,
  onChange,
  ...rest
}: TColorPickerWidgetProps) {
  const [internalColor, setInternalColor] = useState(() =>
    parseToHex(value || "#FFF")
  );
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const hex = parseToHex(value || "#FFF");
    if (hex) {
      setInternalColor(hex);
      setInputValue(value);
    }
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const hex = parseToHex(raw);
    if (hex) {
      setInternalColor(hex);
      onChange(raw); // return raw format (hex or rgb)
    }
  };

  const handleColorPickerChange = (hex: string) => {
    setInternalColor(hex);
    setInputValue(hex);
    onChange(hex);
  };

  return (
    <div className='relative w-full'>
      <div className='absolute left-3 top-2'>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className='h-5 w-5 rounded-full border shadow-xs'
              style={{ backgroundColor: value }}
              aria-label='Open color picker'
            />
          </PopoverTrigger>
          <PopoverContent className='w-auto p-2 shadow-xs rounded-md'>
            <HexColorPicker
              color={internalColor}
              onChange={handleColorPickerChange}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='#RRGGBB or RGB(R, G, B)'
        className='pl-10'
        {...rest}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeWidget() {
  const { theme, setTheme } = useTheme();
  const [value, setValue] = useState(false);

  const handleChange = (value: boolean) => {
    setValue(value);
    setTheme(value ? "dark" : "light");
  };

  useEffect(() => {
    if (typeof window !== "undefined" && theme) {
      setValue(theme == "dark" ? true : false);
    }
  }, [theme]);

  return (
    <div className='flex gap-2 items-center'>
      <Switch id='theme-mode' checked={value} onCheckedChange={handleChange} />
    </div>
  );
}

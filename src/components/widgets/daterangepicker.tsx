"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ButtonWidget } from "@/components/widgets/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectWidget } from "@/components/widgets/select";
import { convertToLabelValuePairs } from "@/utils";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type TDateObject = {
  from?: Date | undefined;
  to?: Date | undefined;
};

type TDateRangePickerWidgetProps = {
  value: TDateObject;
  onChange: (date: TDateObject) => void;
  showMonthYear?: boolean;
  startYear?: number;
  endYear?: number;
  placeholder?: string | React.ReactNode;
};

export function DateRangePickerWidget({
  value,
  onChange,
  startYear = new Date().getFullYear() - 50,
  endYear = new Date().getFullYear() + 50,
  showMonthYear = true,
  placeholder,
}: TDateRangePickerWidgetProps) {
  const [open, setOpen] = React.useState(false);

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string, range: "from" | "to") => {
    const newMonthIndex = months.indexOf(month);
    if (range === "from" && value?.from) {
      const newFrom = setMonth(value.from, newMonthIndex);
      onChange({ ...value, from: newFrom });
    } else if (range === "to" && value?.to) {
      const newTo = setMonth(value.to, newMonthIndex);
      onChange({ ...value, to: newTo });
    }
  };

  const handleYearChange = (year: string, range: "from" | "to") => {
    const newYear = parseInt(year, 10);
    if (range == "from" && value?.from) {
      const newFrom = setYear(value.from, newYear);
      onChange({ ...value, from: newFrom });
    } else if (range === "to" && value?.to) {
      const newTo = setYear(value.to, newYear);
      onChange({ ...value, to: newTo });
    }
  };

  const handleDateRangeSelect = (selectedDateRange: TDateObject) => {
    if (selectedDateRange) {
      onChange(selectedDateRange);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonWidget
          startIcon={<CalendarIcon />}
          variant='outline'
          className='w-full'
          btnText={
            value?.from && value?.to
              ? `${format(value.from, "LLL dd, y")} - ${format(
                  value.to,
                  "LLL dd, y"
                )}`
              : value?.from
              ? `${format(value.from, "LLL dd, y")}`
              : placeholder ?? "Select Date"
          }
        />
      </PopoverTrigger>
      <PopoverContent>
        {showMonthYear && (
          <div className='w-full flex items-center justify-between'>
            <div className='w-full p-3 flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
              <SelectWidget
                onChange={(month) => handleMonthChange(month, "from")}
                value={months[getMonth(value?.from ?? new Date())]}
                options={convertToLabelValuePairs(months)}
              />
              <SelectWidget
                onChange={(year) => handleYearChange(year, "from")}
                value={getYear(value?.from ?? new Date()).toString()}
                options={convertToLabelValuePairs(years)}
              />
            </div>
            <div className='w-full p-3 flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
              <SelectWidget
                onChange={(month) => handleMonthChange(month, "to")}
                value={months[getMonth(value?.from ?? new Date())]}
                options={convertToLabelValuePairs(months)}
              />
              <SelectWidget
                onChange={(year) => handleYearChange(year, "to")}
                value={getYear(value?.from ?? new Date()).toString()}
                options={convertToLabelValuePairs(years)}
              />
            </div>
          </div>
        )}
        <Calendar
          mode='range'
          selected={value as any}
          onSelect={(date) => {
            handleDateRangeSelect(date);
          }}
          numberOfMonths={2}
          month={value?.from ?? undefined}
          onMonthChange={onChange as any}
          required
        />
        <div className='w-full p-3 flex justify-between items-center gap-2'>
          <ButtonWidget
            variant='outline'
            onClick={() => onChange({ from: undefined, to: undefined })}
            btnText='Clear'
          />
          <ButtonWidget
            onClick={() =>
              onChange({
                from: new Date(),
                to: new Date(),
              })
            }
            btnText='Today'
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ButtonWidget } from "@/components/widgets/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectWidget } from "@/components/widgets/select";
import { convertToLabelValuePairs } from "@/utils";
import { cn } from "@/lib/utils";

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

type IDatePickerWidgetProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  showMonthYear?: boolean;
  startYear?: number;
  endYear?: number;
  placeholder?: string | React.ReactNode;
  isDateTime?: boolean;
};

export function DatePickerWidget({
  value,
  onChange,
  startYear = new Date().getFullYear() - 50,
  endYear = new Date().getFullYear() + 50,
  showMonthYear = true,
  placeholder,
  isDateTime,
}: IDatePickerWidgetProps) {
  const [open, setOpen] = React.useState(false);
  const hourScrollArea = React.useRef<HTMLDivElement>(null);
  const minuteScrollArea = React.useRef<HTMLDivElement>(null);
  const ampmScrollArea = React.useRef<HTMLDivElement>(null);

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(value ?? new Date(), months.indexOf(month));
    onChange(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(value ?? new Date(), parseInt(year));
    onChange(newDate);
  };

  const handleDateSelect = (selectedDate: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute" | "ampm", val: string) => {
    if (value) {
      const newDate = new Date(value);
      if (type === "hour") {
        newDate.setHours(
          (parseInt(val) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
        );
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(val));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        newDate.setHours(val === "PM" ? currentHours + 12 : currentHours - 12);
      }
      onChange(newDate);
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
            value instanceof Date && !isNaN(value.getTime())
              ? format(value, `PPP ${isDateTime && "hh:mm aa"}`)
              : placeholder ?? "Select Date"
          }
        />
      </PopoverTrigger>
      <PopoverContent>
        {showMonthYear && (
          <div className='w-full p-3 flex justify-between items-center gap-2'>
            <SelectWidget
              onChange={handleMonthChange}
              value={months[getMonth(value ?? new Date())]}
              options={convertToLabelValuePairs(months)}
            />
            <SelectWidget
              onChange={handleYearChange}
              value={getYear(value ?? new Date()).toString()}
              options={convertToLabelValuePairs(years)}
            />
          </div>
        )}
        <div className='flex flex-col md:flex-row'>
          <Calendar
            mode='single'
            selected={value ?? undefined}
            onSelect={(date) => {
              handleDateSelect(date);
            }}
            month={value ?? undefined}
            onMonthChange={onChange}
            required
          />
          {isDateTime && (
            <div className='flex flex-col sm:flex-row sm:h-full divide-y sm:divide-y-0 sm:divide-x'>
              <ScrollArea ref={hourScrollArea} className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {hours.reverse().map((hour) => (
                    <ButtonWidget
                      key={hour}
                      variant={
                        value && value.getHours() % 12 === hour % 12
                          ? "default"
                          : "ghost"
                      }
                      className='sm:w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange("hour", hour.toString())}
                      btnText={hour}
                    />
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
              <ScrollArea ref={minuteScrollArea} className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <ButtonWidget
                      key={minute}
                      variant={
                        value && value.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className='sm:w-full shrink-0 aspect-square'
                      onClick={() =>
                        handleTimeChange("minute", minute.toString())
                      }
                      btnText={minute}
                    />
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
              <ScrollArea ref={ampmScrollArea} className=''>
                <div className='flex sm:flex-col p-2'>
                  {["AM", "PM"].map((ampm) => (
                    <ButtonWidget
                      key={ampm}
                      variant={
                        value &&
                        ((ampm === "AM" && value.getHours() < 12) ||
                          (ampm === "PM" && value.getHours() >= 12))
                          ? "default"
                          : "ghost"
                      }
                      className='sm:w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange("ampm", ampm)}
                      btnText={ampm}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
        <div className='w-full p-3 flex justify-between items-center gap-2'>
          <ButtonWidget
            variant='outline'
            onClick={() => onChange(undefined)}
            btnText='Clear'
          />
          <ButtonWidget onClick={() => onChange(new Date())} btnText='Today' />
        </div>
      </PopoverContent>
    </Popover>
  );
}

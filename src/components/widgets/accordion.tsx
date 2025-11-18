"use client";

import { PropsWithChildren } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TItemProps = PropsWithChildren<{
  title: string | React.ReactNode;
  value: string;
}>;

type TAccordionWidgetProps = {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  items: TItemProps[];
  autoOpen?: boolean;
  mb?: boolean;
};

export function AccordionWidget({
  type = "single",
  items,
  defaultValue = type === "single" ? items[0]?.value : [items[0]?.value],
  autoOpen = false,
}: TAccordionWidgetProps) {
  return (
    <Accordion
      type={type}
      defaultValue={autoOpen ? (defaultValue as any) : undefined}
      className='w-full'
      collapsible={type === "single" ? true : undefined}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} className='mb-1'>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.children}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

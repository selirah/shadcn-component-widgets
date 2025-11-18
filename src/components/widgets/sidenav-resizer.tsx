"use client";

import { useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ButtonWidget } from "./button";
import { useAppLayout } from "@/contexts/app-layout";

export function SideNavResizer() {
  const { isMinimizeSideNav, onSetMinimizeSideNav } = useAppLayout();

  const handleClick = useCallback(() => {
    const next = !isMinimizeSideNav;
    onSetMinimizeSideNav(next);

    const root = document.querySelector<HTMLElement>("[data-sidenav-root]");
    if (root) root.dataset.collapsed = next ? "true" : "false";
  }, [isMinimizeSideNav, onSetMinimizeSideNav]);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-sidenav-root]");
    if (root) root.dataset.collapsed = isMinimizeSideNav ? "true" : "false";
  }, [isMinimizeSideNav]);

  return (
    <div className='absolute z-50 -right-3 top-5 hidden md:inline-block'>
      <ButtonWidget
        size='icon'
        startIcon={
          isMinimizeSideNav ? <ChevronRightIcon /> : <ChevronLeftIcon />
        }
        onClick={handleClick}
        className='h-6 w-6 bg-accent rounded-full border text-accent-foreground hover:bg-accent'
      />
    </div>
  );
}

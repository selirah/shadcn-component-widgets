"use client";

import { useAppLayout } from "@/contexts/app-layout";
import { menuItems } from "@/data/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TooltipWidget } from "./tooltip";

export function MenuLinksWidget() {
  const { isMinimizeSideNav } = useAppLayout();
  const pathname = usePathname();

  return (
    <ul className='space-y-6'>
      {menuItems.map((group) => (
        <li key={group.group}>
          <h4
            className={cn(
              "text-xs font-semibold uppercase text-muted-foreground mb-2 px-2",
              {
                "text-center px-0": isMinimizeSideNav,
              }
            )}
          >
            {group.group}
          </h4>
          <ul className='space-y-1'>
            {group.items.map((item) => {
              const Icon = item.icon;

              const isActive = pathname.startsWith(item.url);

              return (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center gap-2 p-2 text-xs rounded-md transition-all",
                      {
                        "bg-accent text-accent-foreground font-medium":
                          isActive,
                        "hover:bg-accent": !isActive,
                        "justify-center": isMinimizeSideNav,
                      }
                    )}
                  >
                    {isMinimizeSideNav ? (
                      <TooltipWidget
                        content={item.label}
                        duration={300}
                        side='right'
                      >
                        <Icon
                          className={cn("w-4 h-4", {
                            "text-primary": isActive,
                            "text-muted-foreground": !isActive,
                          })}
                        />
                      </TooltipWidget>
                    ) : (
                      <Icon
                        className={cn("w-4 h-4", {
                          "text-primary": isActive,
                          "text-muted-foreground": !isActive,
                        })}
                      />
                    )}

                    {!isMinimizeSideNav && (
                      <span className=''>{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

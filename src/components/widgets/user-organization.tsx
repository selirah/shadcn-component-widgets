"use client";

import { TOrganization } from "@/app/api/organization/type";
import { cn } from "@/lib/utils";
import { getAvatarColor, getAvatarLetter } from "@/utils";
import { useAppLayout } from "@/contexts/app-layout";
import Link from "next/link";

type TUserOrganizationWidgetProps = {
  organization: TOrganization;
};

export function UserOrganizationWidget({
  organization,
}: TUserOrganizationWidgetProps) {
  const { isMinimizeSideNav } = useAppLayout();

  return (
    <Link href='/organization'>
      <button
        className={cn(
          "w-full text-left inline-flex bg-background hover:bg-secondary gap-3 px-2 py-2 items-center border rounded-md transition-all ease-in-out delay-100",
          {
            "border-0": isMinimizeSideNav,
          }
        )}
      >
        <div
          className={cn(
            "w-10 h-10 rounded-full flex justify-center items-center shrink-0",
            {
              "w-8 h-8": isMinimizeSideNav,
            }
          )}
          style={{
            backgroundColor: getAvatarColor(organization?.name),
          }}
        >
          {getAvatarLetter(organization?.name)}
        </div>
        {!isMinimizeSideNav && (
          <div className='flex flex-col'>
            <h4 className='text-sm font-semibold'>{organization?.name}</h4>
            <p className='text-xs text-muted-foreground'>
              {organization?.industry}
            </p>
          </div>
        )}
      </button>
    </Link>
  );
}

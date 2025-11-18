"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AvatarWidget } from "@/components/widgets/avatar";
import { TUser } from "@/app/api/user/me/type";
import { generateGravatarUrl, getAvatarLetter } from "@/utils";
import Link from "next/link";
import { CogIcon, CreditCardIcon, MedalIcon, LogOutIcon } from "lucide-react";

type TUserSettingsProps = {
  user: TUser;
};

export function UserSettingsWidget({ user }: TUserSettingsProps) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className='flex-wrap'>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='border flex justify-between rounded-full pl-1 pr-2 py-5 shadow-xs'>
            <div className='flex items-center gap-1'>
              <AvatarWidget
                imageSrc={generateGravatarUrl(user?.email)}
                fallbackText={getAvatarLetter(
                  user?.family_name ?? user?.given_name
                )}
              />
              <span className='text-sm font-medium'>{user?.given_name}</span>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent className='min-w-72 flex flex-col gap-2 bg-background rounded-md p-2 absolute top-full w-auto shadow-md right-0 left-auto'>
            <div className='flex w-full items-center gap-3.5 rounded-md bg-secondary p-2'>
              <AvatarWidget
                imageSrc={generateGravatarUrl(user?.email)}
                fallbackText={getAvatarLetter(
                  user?.family_name ?? user?.given_name
                )}
              />
              <div className='flex flex-col'>
                <h6 className='text-sm font-semibold wrap-break-word whitespace-normal'>
                  {user?.name}
                </h6>
                <p className='text-xs text-muted-foreground font-medium wrap-break-word whitespace-normal'>
                  {user?.email}
                </p>
              </div>
            </div>
            <ul className='grid gap-4'>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href='/user/settings'
                    className='flex-row items-center gap-2'
                  >
                    <CogIcon />
                    Settings
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href='/user/billing'
                    className='flex-row items-center gap-2'
                  >
                    <CreditCardIcon />
                    Billing
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href='/user/subscription'
                    className='flex-row items-center gap-2'
                  >
                    <MedalIcon />
                    Subscription
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a
                    href='/auth/logout'
                    className='flex-row items-center gap-2 text-destructive hover:text-destructive'
                  >
                    <LogOutIcon className='text-destructive' />
                    Logout
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

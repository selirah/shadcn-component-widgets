"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TAvatarWidget = {
  imageSrc?: string;
  altText?: string;
  fallbackText: string;
  className?: string;
};

export function AvatarWidget({
  fallbackText,
  altText,
  imageSrc,
  ...rest
}: TAvatarWidget) {
  return (
    <Avatar {...rest}>
      {imageSrc && <AvatarImage src={imageSrc} alt={altText || "Avatar"} />}
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
}

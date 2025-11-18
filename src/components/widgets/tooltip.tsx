import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TTooltipWidgetProps = React.PropsWithChildren<{
  content: string;
  duration?: number;
  side?: "top" | "right" | "bottom" | "left";
}>;

export function TooltipWidget({
  content,
  duration = 300,
  side = "top",
  children,
}: TTooltipWidgetProps) {
  return (
    <Tooltip delayDuration={duration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
}

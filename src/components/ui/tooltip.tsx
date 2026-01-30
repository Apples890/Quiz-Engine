import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className="z-50 overflow-hidden rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1"
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export default Tooltip;

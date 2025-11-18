"use client";

import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AudioWaveformIcon, BotIcon, XIcon } from "lucide-react";
import { useAppLayout } from "@/contexts/app-layout";

export function ConversationWidget() {
  const { onSetChatPaneOpened, isChatPaneOpened, chatPaneType } =
    useAppLayout();

  return (
    <AnimatePresence>
      {isChatPaneOpened && (
        <motion.div
          key='conversation-widget'
          className='w-72 flex flex-col border-l'
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className='p-4 border-b flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              {chatPaneType === "chat" ? (
                <BotIcon className='text-primary size-4' />
              ) : (
                <AudioWaveformIcon className='text-primary size-4' />
              )}

              <h4 className='text-sm font-semibold'>
                {chatPaneType === "chat" ? "Web Chat" : "Voice Chat"}
              </h4>
            </div>
            <button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon-sm",
                  className: "rounded-full",
                })
              )}
              onClick={() => {
                onSetChatPaneOpened(false);
              }}
            >
              <XIcon />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

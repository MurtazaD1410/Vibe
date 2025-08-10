"use client";

import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const MessagesContainerErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 h-full">
      <AlertTriangle className="w-4 h-4" />
      <h1 className="text-sm">Failed to load messages</h1>

      <Button
        variant="ghost"
        onClick={() => window.location.reload()}
        size="icon"
      >
        <RefreshCcw />
      </Button>
    </div>
  );
};

export default MessagesContainerErrorFallback;

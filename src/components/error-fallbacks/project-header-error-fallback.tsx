"use client";

import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectHeaderErrorFallback = () => {
  return (
    <div className="flex items-center justify-between text-center px-4 h-14 border-b">
      <div className="flex gap-2 items-center">
        <AlertTriangle className="w-4 h-4" />
        <h1 className="text-sm">Failed to load project</h1>
      </div>
      <div className="">
        <Button
          variant="ghost"
          onClick={() => window.location.reload()}
          size="icon"
        >
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeaderErrorFallback;

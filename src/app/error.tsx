"use client";

import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <AlertTriangle className=" w-6 h-6 mb-2" />
      <h1 className="text-lg  mb-1">Something went wrong</h1>
      <p className="text-sm text-muted-foreground mb-1 max-w-md">
        An unexpected error has occurred. Please try again later.
      </p>
      <Button
        variant={"ghost"}
        onClick={() => window.location.reload()}
        size={"icon"}
      >
        <RefreshCcw />
      </Button>
    </div>
  );
};

export default ErrorPage;

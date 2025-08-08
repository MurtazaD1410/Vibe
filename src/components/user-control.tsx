"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import { dark } from "@clerk/themes";

interface Props {
  showName?: boolean;
}

const UserControl = ({ showName }: Props) => {
  const currentTheme = useCurrentTheme();

  return (
    <UserButton
      showName={showName}
      appearance={{
        elements: {
          userButtonBox: "rounded-md!",
          userButtonAvatarBox: "rounded-md! size-8!",
          userButtonTrigger: "rounded-md!",
        },
        theme: currentTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default UserControl;

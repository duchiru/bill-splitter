"use client";

import * as React from "react";

import { UserContext } from "@/components/providers/user-provider";

import { redirect } from "next/navigation";

export default function UploadReciept() {
  const userContext = React.useContext(UserContext);

  if (!userContext.user) {
    return redirect("/");
  }

  return <div className="w-dvw h-dvh flex items-center justify-center">Logged in as {userContext.user}</div>;
}

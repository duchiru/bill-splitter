"use client";

import * as React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InfoIcon } from "lucide-react";

export default function Home() {
  const [id, setId] = React.useState("");

  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div>
          <Alert>
            <InfoIcon />
            <AlertTitle>Đăng nhập bằng cách nhập mã định danh</AlertTitle>
          </Alert>
        </div>

        <InputOTP maxLength={8} pattern={REGEXP_ONLY_DIGITS} value={id} onChange={setId}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>

        <Button>Đăng nhập</Button>
      </div>
    </div>
  );
}

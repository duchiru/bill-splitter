"use client";

import * as React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { InfoIcon } from "lucide-react";

import { UserContext } from "@/components/providers/user-provider";

import { redirect } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";

import { findUserById } from "@/app/server/spreadsheet";

export default function LoginPage() {
	const userContext = React.useContext(UserContext);
	const [id, setId] = React.useState("");

	const handleLogin = React.useCallback(
		async (id: string) => {
			const user = await findUserById(id);

			if (!user) {
				toast.error("Sai mã định danh, vui lòng thử lại!");
				return;
			}

			toast.success(`Đăng nhập thành công! Xin chào ${user}`);

			userContext.setUser(user);

			redirect("/upload");
		},
		[userContext],
	);

	return (
		<div className="w-dvw h-dvh flex items-center justify-center">
			<div className="flex flex-col items-center gap-8">
				<div>
					<Alert>
						<InfoIcon />
						<AlertTitle>Đăng nhập bằng cách nhập mã định danh</AlertTitle>
					</Alert>
				</div>

				<InputOTP
					maxLength={8}
					pattern={REGEXP_ONLY_DIGITS}
					value={id}
					onChange={setId}
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
						<InputOTPSlot index={6} />
						<InputOTPSlot index={7} />
					</InputOTPGroup>
				</InputOTP>

				<Button onClick={() => handleLogin(id)}>Đăng nhập</Button>
			</div>
		</div>
	);
}

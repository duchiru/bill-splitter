"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CameraIcon, CropIcon, CheckCircleIcon, InfoIcon } from "lucide-react";

import { UserContext } from "@/components/providers/user-provider";

import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UploadReciept() {
	const userContext = React.useContext(UserContext);

	const imgInputRef = React.useRef<HTMLInputElement>(null);
	const [recieptImg, setRecieptImg] = React.useState<Buffer | null>(null);

	if (!userContext.user) {
		return redirect("/");
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const arrayBuffer = reader.result as ArrayBuffer;
				const buffer = Buffer.from(arrayBuffer);
				setRecieptImg(buffer);
			};
			reader.readAsArrayBuffer(file);
		}
	};

	return (
		<div className="w-dvw h-dvh flex flex-col items-center justify-center p-4 gap-4">
			<input
				ref={imgInputRef}
				type="file"
				accept="image/*"
				capture="environment"
				onChange={handleFileChange}
				className="hidden"
			/>

			{recieptImg ? (
				<>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={`data:image/jpeg;base64,${recieptImg.toString("base64")}`}
						alt="Receipt preview"
						className="max-w-full object-contain rounded-lg shadow-lg"
					/>

					<div className="flex gap-4">
						<Button>
							<CropIcon strokeWidth={2.5} />
							Cắt ảnh
						</Button>
						<Button>
							<CheckCircleIcon strokeWidth={2.5} />
							Dùng ảnh này
						</Button>
					</div>
				</>
			) : (
				<>
					<div>
						<Alert>
							<InfoIcon />
							<AlertTitle>Nhấn nút bên dưới để chụp ảnh hóa đơn</AlertTitle>
							<AlertDescription>
								<p>Hãy đảm bảo hình ảnh:</p>
								<ul className="list-inside list-disc text-sm">
									<li>Đủ ánh sáng, sắc nét, không mờ nhòe</li>
									<li>Để gần hóa đơn nhất có thể</li>
									<li>Chụp hết hóa đơn, không bị mất thông tin</li>
									<li>Không có vật cản che khuất hóa đơn</li>
								</ul>
							</AlertDescription>
						</Alert>
					</div>

					<Button
						variant="outline"
						size="icon"
						className="size-32 rounded-3xl"
						onClick={() => imgInputRef.current?.click()}
					>
						<CameraIcon className="size-16" />
					</Button>
				</>
			)}
		</div>
	);
}

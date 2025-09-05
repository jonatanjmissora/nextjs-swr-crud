"use client"

import { useFormStatus } from "react-dom"

export const SubmitBtn = ({ disabled }: { disabled?: boolean }) => {
	const { pending } = useFormStatus()

	return (
		<button
			type="submit"
			className="bg-slate-600/20 px-2 py-1 rounded cursor-pointer"
			disabled={disabled || pending}
		>
			{pending ? "..." : "Add"}
		</button>
	)
}

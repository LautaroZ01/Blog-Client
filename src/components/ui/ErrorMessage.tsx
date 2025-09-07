import { ReactNode } from "react";

export default function ErrorMessage({children}: {children: ReactNode}) {
  return (
    <div className="font-bold text-red-600 p-2 text-sm">
        {children}
    </div>
  )
}
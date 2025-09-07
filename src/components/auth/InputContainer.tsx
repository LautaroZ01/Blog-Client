import { PropsWithChildren } from "react";

export default function InputContainer({children}: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-2 mt-2 w-full">
        {children}
    </div>
  )
}

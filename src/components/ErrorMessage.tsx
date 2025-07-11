
import type { PropsWithChildren } from "react"
export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <div className="text-red-500 font-bold">{children}</div>
  )
}

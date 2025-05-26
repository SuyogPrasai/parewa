import { Navbar } from "@/components/collection-navbar"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return (
    <>
      <Navbar />
      <Separator />
      <h1 className="text-6xl font-oswald mt-5">Notices</h1>
      <div className="h-[200vh]"></div>
    </>
  )
}
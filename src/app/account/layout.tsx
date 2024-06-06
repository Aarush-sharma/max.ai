import { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/ui/sidebar-nav"

export const metadata: Metadata = {
  title: "settings",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/account",
  },
  {
    title: "Account",
    href: "/account/info",
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 md:block overflow-hidden h-screen">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
          <Toaster />
        </div>
      </div>
    </>
  )
}
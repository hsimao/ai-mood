import { UserButton } from '@clerk/nextjs'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen relative flex">
      <aside className="w-[200px] h-full border-r border-black/10">Mood</aside>
      <div className="w-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100%-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout

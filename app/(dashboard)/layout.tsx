import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
]

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen relative flex">
      <aside className="w-[200px] h-full border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">MOOD</span>
        </div>

        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li className="text-xl my-4" key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
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

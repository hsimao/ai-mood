function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen relative flex">
      <aside className="w-[200px] h-full border-r border-black/10">Mood</aside>
      <div className="w-full">
        <header className="h-[60px] border-b border-black/10">Hello</header>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout

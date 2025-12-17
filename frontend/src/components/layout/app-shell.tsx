"use client"

import { useState } from 'react'
import { Sidebar } from '@/components/navigation/sidebar'
import { Topbar } from '@/components/navigation/topbar'
import { cn } from '@/lib/cn'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen((prev) => !prev)
      return
    }
    setCollapsed((prev) => !prev)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div
        className={cn(
          'hidden lg:block transition-[width] duration-150 ease-out',
          collapsed ? 'w-[86px]' : 'w-[280px]'
        )}
      >
        <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />
      </div>

      {sidebarOpen ? (
        <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs lg:hidden">
          <div className="flex h-full w-full bg-white/95 backdrop-blur-lg shadow-xl">
            <Sidebar onToggle={() => setSidebarOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-slate-50 px-3 pb-12 pt-6 lg:px-4">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">{children}</div>
        </main>
      </div>
    </div>
  )
}


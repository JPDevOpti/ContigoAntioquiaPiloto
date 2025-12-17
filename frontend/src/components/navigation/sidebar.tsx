"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav, secondaryNav } from '@/data/navigation'
import { SidebarIcon } from '@/components/navigation/sidebar-icon'
import { cn } from '@/lib/cn'
import { icons } from '@/icons'

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname() ?? ''

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-screen flex-col justify-between overflow-visible border-r border-slate-200 bg-white shadow-sm transition-[width,padding] duration-200 ease-out',
         collapsed ? 'w-[160px] px-2 py-4' : 'w-[280px] px-3 py-4'
      )}
    >
      <div className="space-y-10">
        <div className="flex justify-center px-0">
          <div
            className={cn(
              'relative flex-shrink-0',
               collapsed ? 'h-14 w-14' : 'h-28 w-full max-w-[420px]'
            )}
          >
            <Image
              src="/img/Contigo%20Antioquia%20Salud%20LOGO-02.png"
              alt="Logo Contigo Antioquia Salud"
              fill
               sizes="420px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <nav className="space-y-6">
          <div className="space-y-2">
            {mainNav.map((item) => {
              const active = pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'group relative flex items-center rounded-xl py-3 text-base font-medium transition-all duration-200 ease-out hover:bg-slate-100 hover:text-slate-900',
                    active ? 'bg-secondary-sky text-primary-dark shadow-sm' : 'text-slate-600',
                    collapsed ? 'justify-center px-0' : 'gap-3 px-4'
                  )}
                >
                  <SidebarIcon
                    name={item.icon}
                    className={cn(
                      'h-6 w-6 flex-shrink-0 text-slate-500 transition-colors duration-200 ease-out',
                      active && 'text-primary'
                    )}
                  />
                  <span
                    className={cn(
                      'whitespace-nowrap text-left text-sm transition-all duration-200 ease-out',
                      collapsed ? 'pointer-events-none max-w-0 opacity-0' : 'max-w-[160px] opacity-100'
                    )}
                  >
                    {item.label}
                  </span>
                  {collapsed && (
                    <span className="absolute left-full ml-2 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white shadow-lg group-hover:block">
                      {item.label}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="space-y-2">
            {secondaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'group relative flex items-center rounded-xl py-3 text-base font-medium text-slate-500 transition-all duration-200 ease-out hover:bg-slate-100 hover:text-slate-700',
                  collapsed ? 'justify-center px-0' : 'gap-3 px-4'
                )}
              >
                <SidebarIcon name={item.icon} className="h-6 w-6 text-slate-400" />
                <span
                  className={cn(
                    'whitespace-nowrap text-left text-sm transition-all duration-200 ease-out',
                    collapsed ? 'pointer-events-none max-w-0 opacity-0' : 'max-w-[160px] opacity-100'
                  )}
                >
                  {item.label}
                </span>
                {collapsed && (
                  <span className="absolute left-full ml-2 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white shadow-lg group-hover:block">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {!collapsed && (
        <button
          type="button"
          onClick={onToggle}
          className="group flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-primary-light hover:text-primary-dark"
        >
          <span>Colapsar</span>
          <icons.chevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        </button>
      )}
      {collapsed && (
        <button
          type="button"
          onClick={onToggle}
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-primary-light hover:bg-secondary-sky hover:text-primary-dark"
        >
          <icons.chevronRight className="h-5 w-5" />
        </button>
      )}
    </aside>
  )
}


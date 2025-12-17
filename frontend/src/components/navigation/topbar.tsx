"use client"

import { useState } from 'react'
import Link from 'next/link'
import { icons } from '@/icons'
import { cn } from '@/lib/cn'

interface TopbarProps {
  onToggleSidebar?: () => void
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl shadow-sm lg:px-6">
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-primary-light hover:bg-secondary-sky hover:text-primary-dark"
          aria-label="Alternar sidebar"
        >
          <icons.menu className="h-5 w-5" />
        </button>

        <div className="relative flex-1 max-w-2xl">
          <div className={cn('relative flex items-center transition-all', searchFocused && 'scale-[1.02]')}>
            <icons.search className="absolute left-4 h-5 w-5 text-slate-400 transition-colors" />
            <input
              type="search"
              placeholder="Buscar indicadores, alertas o ubicaciones"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-500 transition-all focus:border-primary-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all hover:border-primary-light hover:shadow-md"
        >
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-sm shadow-primary/30">
            <icons.user className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="hidden text-sm sm:block">
            <p className="font-semibold text-slate-900">Equipo Antioquia</p>
            <p className="text-xs text-slate-600">Gestor territorial</p>
          </div>
        </Link>
      </div>
    </header>
  )
}


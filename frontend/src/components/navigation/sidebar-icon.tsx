import type { IconName } from '@/icons'
import { icons } from '@/icons'
import { cn } from '@/lib/cn'

interface SidebarIconProps {
  name?: IconName
  className?: string
}

export function SidebarIcon({ name, className }: SidebarIconProps) {
  const Icon = name ? icons[name] ?? icons.layout : icons.layout
  return <Icon className={cn('h-5 w-5 text-slate-500', className)} strokeWidth={1.5} />
}


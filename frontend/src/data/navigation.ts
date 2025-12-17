export interface NavItem {
  label: string
  href: string
  icon?: string
}

export const mainNav: NavItem[] = [
  { label: 'Panel general', href: '/dashboard', icon: 'layout' },
  { label: 'Indicadores', href: '/analytics', icon: 'chart' },
  { label: 'Capacidad instalada', href: '/capacity', icon: 'building' },
  { label: 'Eventos', href: '/events', icon: 'alert' }
]

export const secondaryNav: NavItem[] = [{ label: 'Documentación', href: '#', icon: 'book' }]


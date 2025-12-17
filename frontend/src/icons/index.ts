import {
  LayoutDashboard,
  BarChart3,
  Building2,
  Bell,
  BookOpen,
  Menu,
  Search,
  UserRound,
  ChevronLeft,
  ChevronRight,
  type LucideProps
} from 'lucide-react'

export const icons = {
  layout: LayoutDashboard,
  chart: BarChart3,
  building: Building2,
  alert: Bell,
  book: BookOpen,
  menu: Menu,
  search: Search,
  user: UserRound,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight
}

export type IconName = keyof typeof icons

export type IconComponent = (props: LucideProps) => JSX.Element


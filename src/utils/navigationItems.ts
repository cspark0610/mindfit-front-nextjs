<<<<<<< HEAD:src/components/molecules/Sidebar/items.ts
import { Building, Calendar, Journal, LayoutWtf } from 'react-bootstrap-icons'
=======
import { Calendar, Journal, LayoutWtf, Building } from 'react-bootstrap-icons'
>>>>>>> 23a7a9c333e7941743a179c24c9f2ab9cd06f213:src/utils/navigationItems.ts

export const coacheeItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coachee' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]
<<<<<<< HEAD:src/components/molecules/Sidebar/items.ts
export const coacheeAdminItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coachee' },
  { label: 'Organización', icon: Building, url: '/dashboard/organization' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]
=======

export const coacheeWithOrgItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coachee' },
  { label: 'Organizacion', icon: Building, url: '/dashboard/organization' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]

>>>>>>> 23a7a9c333e7941743a179c24c9f2ab9cd06f213:src/utils/navigationItems.ts
export const coachItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coach' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]

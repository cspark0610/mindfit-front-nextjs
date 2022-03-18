import { Building, Calendar, Journal, LayoutWtf } from 'react-bootstrap-icons'

export const coacheeItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coachee' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]
export const coacheeAdminItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coachee' },
  { label: 'Organización', icon: Building, url: '/dashboard/organization' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]
export const coachItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coach' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]

import { Calendar, Journal, LayoutWtf, Building } from 'react-bootstrap-icons'

export const coacheeItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coachee' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]

export const coacheeWithOrgItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coachee' },
  { label: 'Organizacion', icon: Building, url: '/dashboard/organization' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]

export const coachItems = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coach' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
]

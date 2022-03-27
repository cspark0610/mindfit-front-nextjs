import { Calendar, Journal, LayoutWtf, Building } from 'react-bootstrap-icons'

export const coacheeItems = () => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coachee' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: '/user/schedule' },
]

export const coacheeWithOrgItems = () => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coachee' },
  { label: 'Organizacion', icon: Building, url: '/dashboard/organization' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: '/user/schedule' },
]

export const coachItems = () => [
  { label: 'Inicio', icon: LayoutWtf, url: '/dashboard/coach' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: '/user/schedule' },
]

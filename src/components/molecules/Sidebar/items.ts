import {
  Calendar,
  ChatRightText,
  Journal,
  LayoutWtf,
} from 'react-bootstrap-icons'

export const items = (id?: number) => [
  { label: 'Inicio', icon: LayoutWtf, url: '/user' },
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
  { label: 'Chat', icon: ChatRightText, url: '#' },
]

import {
  Calendar,
  ChatRightText,
  Journal,
  LayoutWtf,
} from 'react-bootstrap-icons'

export const items = (id?: number) => [
  { label: 'Biblioteca', icon: Journal, url: '/library' },
  { label: 'Agenda', icon: Calendar, url: `/user/${id}/schedule` },
  { label: 'Dashboard', icon: LayoutWtf, url: '/user' },
  { label: 'Chat', icon: ChatRightText, url: '#' },
]

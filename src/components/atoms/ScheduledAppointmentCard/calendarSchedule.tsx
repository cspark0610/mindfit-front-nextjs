// bootstrap components
import { ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { Google, EnvelopeFill, FileEarmarkFill } from 'react-bootstrap-icons'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { FC } from 'react'

export const CalendarSchedule: FC = () => {
  const handleGoogleSchedule = () => console.log('Google')
  const handleOutlookSchedule = () => console.log('Outlook')
  const handleDownloadSchedule = () => console.log('Download')

  return (
    <DropdownButton className={classes.dropdown} title='Agregar al calendario'>
      <Dropdown.Item onClick={handleGoogleSchedule}>
        <Google className='me-2' color='#045095' />
        Google
      </Dropdown.Item>
      <Dropdown.Item onClick={handleOutlookSchedule}>
        <EnvelopeFill className='me-2' color='#045095' />
        Outlook
      </Dropdown.Item>
      <Dropdown.Item onClick={handleDownloadSchedule}>
        <FileEarmarkFill className='me-2' color='#045095' />
        Descargar
      </Dropdown.Item>
    </DropdownButton>
  )
}

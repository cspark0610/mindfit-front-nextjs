// styles
import classes from 'styles/coachAgenda/page.module.scss'

// types
import { CalendarDateTemplateParams } from 'primereact/calendar'
import { SetStateType } from 'types'

export const coacheeAgendaTemplate = (
  props: CalendarDateTemplateParams,
  selectedDate: Date | null,
  setSelectedDate: SetStateType<Date | null>
) => {
  const actualDate = new Date(`${props.month + 1}/${props.day}/${props.year}`)
  const isSelected =
    selectedDate?.getDate() === props.day &&
    selectedDate?.getMonth() === props.month &&
    selectedDate?.getFullYear() === props.year

  return (
    <span
      className={isSelected ? classes.selectedDate : ''}
      onClick={() => setSelectedDate(actualDate)}>
      {props.day}
    </span>
  )
}

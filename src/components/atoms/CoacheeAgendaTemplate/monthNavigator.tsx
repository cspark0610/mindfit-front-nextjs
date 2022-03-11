// prime components
import { Dropdown } from 'primereact/dropdown'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { FC } from 'react'
import { SetStateType } from 'types'
import {
  Calendar,
  CalendarMonthNavigatorTemplateParams,
} from 'primereact/calendar'

type MonthNavigator = {
  calendar: Calendar
  setSelectedMonth: SetStateType<Date | null>
  monthSelector: CalendarMonthNavigatorTemplateParams
}

export const MonthNavigator: FC<MonthNavigator> = ({
  calendar,
  monthSelector,
  setSelectedMonth,
}) => (
  <Dropdown
    optionLabel='label'
    optionValue='value'
    className={classes.input}
    value={monthSelector.value}
    panelClassName={classes.zindex}
    options={monthSelector.options}
    onChange={(ev) => {
      const updateMonth = new Date()
      updateMonth.setMonth(ev.value)
      if (updateMonth.getMonth() !== monthSelector.options[0].value)
        updateMonth.setDate(1)
      else updateMonth.setDate(calendar.state.viewDate.getDate())

      setSelectedMonth(updateMonth)
      calendar.setState({
        ...calendar.state,
        viewDate: new Date(calendar.state.viewDate.setMonth(ev.value)),
      })
    }}
  />
)

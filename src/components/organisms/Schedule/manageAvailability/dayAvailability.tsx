// main tools
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Plus, Dash } from 'react-bootstrap-icons'

// prime components
import { Calendar } from 'primereact/calendar'

// utils
import { formatHour } from 'commons'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { availabilityRangeDataType } from 'types/models/Agenda'
import { CalendarChangeParams } from 'primereact/calendar'
import { SetStateType } from 'types'
import { FC } from 'react'

type DayAvailabilityProps = {
  dayKey: string
  day: { from?: string | Date; to?: string | Date }[]
  updateRanges: SetStateType<availabilityRangeDataType | undefined>
}

export const DayAvailability: FC<DayAvailabilityProps> = ({
  day,
  dayKey,
  updateRanges,
}) => {
  const [availableRanges, setAvailableRanges] = useState(day)

  const handleChangeAvailability = (ev: CalendarChangeParams, idx: number) => {
    const updateDateRanges = [...availableRanges]
    if (updateDateRanges[idx]) {
      const updateDate = dayjs(ev.target.value as Date).format('HH:mm')
      updateDateRanges[idx][
        ev.target.name as keyof typeof updateDateRanges[typeof idx]
      ] = updateDate

      setAvailableRanges(updateDateRanges)
    }
  }

  const handleAddRange = () =>
    setAvailableRanges([
      ...(availableRanges && availableRanges),
      { from: '00:00', to: '00:00' },
    ])

  const removeRange = (idx: number) =>
    setAvailableRanges(availableRanges.filter((_, index) => index !== idx))

  useEffect(() => {
    updateRanges((prev) => ({ ...prev, [dayKey]: availableRanges }))
  }, [dayKey, availableRanges, updateRanges])

  return (
    <Container className={classes.range}>
      <Row className='flex-row-reverse my-4'>
        <Col xs={5}>
          <Button onClick={handleAddRange} variant='outline-primary'>
            Agregar Intervalo <Plus size={28} />
          </Button>
        </Col>
      </Row>
      {availableRanges?.map(({ from, to }, idx) => (
        <Row className='my-4' key={idx}>
          <Col className={classes.range_item} xs={5}>
            <label htmlFor={`from-${idx}`} className={classes.label}>
              Desde
            </label>
            <Calendar
              timeOnly
              name='from'
              hourFormat='24'
              placeholder={from as string}
              inputClassName={classes.input}
              className={classes.timeSelector}
              value={formatHour(from as string | Date)}
              panelClassName={classes.timeSelectorPanel}
              onChange={(ev) => handleChangeAvailability(ev, idx)}
            />
          </Col>
          <Col className={classes.range_item} xs={5}>
            <label htmlFor={`to-${idx}`} className={classes.label}>
              Hasta
            </label>
            <Calendar
              timeOnly
              name='to'
              hourFormat='24'
              placeholder={to as string}
              inputClassName={classes.input}
              className={classes.timeSelector}
              value={formatHour(to as string | Date)}
              panelClassName={classes.timeSelectorPanel}
              onChange={(ev) => handleChangeAvailability(ev, idx)}
            />
          </Col>
          <Col className={classes.range_item} xs={2}>
            <Button
              variant='outline-secondary'
              onClick={() => removeRange(idx)}
              className={classes.range_item_delete}>
              <Dash />
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  )
}

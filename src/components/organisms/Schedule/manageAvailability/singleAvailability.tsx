// main tools
import { useState, useEffect } from 'react'

// bootstrap components
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap'

// prime components
import { InputSwitch } from 'primereact/inputswitch'

// gql
import { useMutation } from '@apollo/client'
import UPDATE_AVAILABILITY from 'lib/mutations/Coach/updateAvailability.gql'

// utils
import { microServices } from 'commons'

// components
import { DayAvailability } from 'components/organisms/Schedule/manageAvailability/dayAvailability'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { FC } from 'react'
import { SetStateType } from 'types'
import { AgendaDataType, RangeDataType } from 'types/models/Agenda'

type SingleAvailabilityProps = {
  content: any
  agenda: AgendaDataType
  selectedDate: Date | null
  showModal: SetStateType<boolean>
}

export const SingleAvailability: FC<SingleAvailabilityProps> = ({
  content,
  agenda,
  showModal,
  selectedDate,
}) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(agenda.outOfService)
  const [availabilityRange, setAvailabilityRange] = useState(
    agenda.availabilityRange
  )
  const [dateToSchedule, setDateToSchedule] = useState<
    { key: string; value: RangeDataType[] } | undefined
  >(undefined)

  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY, {
    context: { ms: microServices.backend },
    onCompleted: () => showModal(false),
    onError: (err) => console.log(err),
  })

  const handleSaveAvailability = async () => {
    setLoading(true)
    const updateAvailabilityRange = { ...availabilityRange }

    await updateAvailability({
      variables: {
        data: {
          outOfService: disabled,
          availabilityRange: updateAvailabilityRange,
        },
      },
    })

    setLoading(false)
  }

  useEffect(() => {
    Object.entries(availabilityRange as object).map(([key, value], idx) => {
      if ((selectedDate?.getDay() as number) === 0 && idx === 6)
        setDateToSchedule({ key, value })
      if ((selectedDate?.getDay() as number) - 1 === idx)
        setDateToSchedule({ key, value })
    })
  }, [selectedDate, availabilityRange])

  return (
    <Container className={classes.availability}>
      <h3 className={classes.title}>{content.availabilityDayButton.label}</h3>
      <Row>
        <Col xs={8}>
          <p>{dateToSchedule?.key}</p>
        </Col>
        <Col className='d-flex align-items-center' md={4}>
          <label htmlFor='disabled'>{content.outServiceButton.label}</label>
          <InputSwitch
            className={classes.availability_switch}
            inputId='disabled'
            checked={disabled}
            onChange={(e) => setDisabled(e.value)}
          />
        </Col>
      </Row>

      {dateToSchedule && (
        <Row className='my-5'>
          <DayAvailability
            content={content}
            dayKey={dateToSchedule?.key as string}
            day={dateToSchedule?.value}
            updateRanges={setAvailabilityRange}
          />
        </Row>
      )}

      <Row className='flex-row-reverse'>
        <Col xs={3}>
          <Button onClick={handleSaveAvailability} className={classes.button}>
            {loading ? <Spinner animation='border' /> : 'Guardar'}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

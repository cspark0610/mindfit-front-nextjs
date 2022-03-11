// main tools
import { useState } from 'react'

// bootstrap components
import {
  Container,
  Accordion,
  Col,
  Row,
  Button,
  Spinner,
} from 'react-bootstrap'

// prime components
import { InputSwitch } from 'primereact/inputswitch'

// components
import { DayAvailability } from 'components/organisms/Schedule/manageAvailability/dayAvailability'

// utils
import { microServices } from 'commons'

// gql
import { useMutation } from '@apollo/client'
import UPDATE_AVAILABILITY from 'lib/mutations/Coach/updateAvailability.gql'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { FC } from 'react'
import { AgendaDataType } from 'types/models/Agenda'

type ManageAvailabilityProps = {
  agenda: AgendaDataType
}

export const GeneralAvailability: FC<ManageAvailabilityProps> = ({
  agenda,
}) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(agenda.outOfService)
  const [availabilityRanges, setAvailabilityRanges] = useState(
    agenda.availabilityRange
  )

  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY, {
    context: { ms: microServices.backend },
    onError: (err) => console.log(err),
  })

  const handleSaveAvailability = async () => {
    setLoading(true)
    const updateAvailabilityRange = { ...availabilityRanges }

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

  return (
    <Container className={classes.availability}>
      <h3 className={classes.title}>Gestionar Disponibilidad</h3>
      <Row>
        <Col md={8}>
          <p>Resumen de disponibilidad</p>
        </Col>
        <Col className='d-flex align-items-center' md={4}>
          <label htmlFor='disabled'>Fuera de servicio</label>
          <InputSwitch
            className={classes.availability_switch}
            inputId='disabled'
            checked={disabled}
            onChange={(e) => setDisabled(e.value)}
          />
        </Col>
      </Row>

      <Row className='my-5'>
        <Col xs={12}>
          <Accordion defaultActiveKey='0'>
            {Object.entries(availabilityRanges as object).map(
              ([key, value], idx) => (
                <Accordion.Item key={key} eventKey={`${idx}`}>
                  <Accordion.Header>{key}</Accordion.Header>
                  <Accordion.Body>
                    <DayAvailability
                      dayKey={key}
                      day={value}
                      updateRanges={setAvailabilityRanges}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              )
            )}
          </Accordion>
        </Col>
      </Row>
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

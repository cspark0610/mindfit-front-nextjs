// main tools
import { useState } from 'react'

// bootstrap components
import {
  Col,
  Row,
  Button,
  Spinner,
  Container,
  Accordion,
} from 'react-bootstrap'

// prime components
import { InputSwitch } from 'primereact/inputswitch'

// components
import { DayAvailability } from 'components/organisms/Schedule/manageAvailability/dayAvailability'

// utils
import { microServices } from 'commons'

// gql
import UPDATE_AVAILABILITY from 'lib/mutations/Coach/updateAvailability.gql'
import { useMutation } from '@apollo/client'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { AgendaDataType } from 'types/models/Agenda'
import { SetStateType } from 'types'
import { FC } from 'react'

type ManageAvailabilityProps = {
  content: any
  agenda: AgendaDataType
  showModal: SetStateType<boolean>
}

export const GeneralAvailability: FC<ManageAvailabilityProps> = ({
  content,
  agenda,
  showModal,
}) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(agenda.outOfService)
  const [availabilityRanges, setAvailabilityRanges] = useState(
    agenda.availabilityRange
  )

  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY, {
    context: { ms: microServices.backend },
    onCompleted: () => showModal(false),
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
      <h3 className={classes.title}>{content.availabilityLabel}</h3>
      <Row>
        <Col md={8}>
          <p>{content.summaryLabel}</p>
        </Col>
        <Col className='d-flex align-items-center' md={4}>
          <label htmlFor='disabled'>{content.outServiceButton.label}</label>
          <InputSwitch
            inputId='disabled'
            checked={disabled}
            onChange={(e) => setDisabled(e.value)}
            className={classes.availability_switch}
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
                      day={value}
                      dayKey={key}
                      content={content}
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

// Main utils
import { useState } from 'react'

// Components
import { PaymentMethodCard } from 'components/molecules/PaymentMethodCard'

// bootstrap components
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'

// styles
import classes from 'styles/Choose-plan/page.module.scss'

// types
import { FC } from 'react'

interface Props {
  selected: boolean
  contentCard: any
  contentMethod: any
}

export const PlanCard: FC<Props> = ({
  selected,
  contentCard,
  contentMethod,
}) => {
  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)
  return (
    <Container className={selected ? classes.banner_selected : classes.banner}>
      <div className={classes.card}>
        <h4 className={classes.card_title}>{contentCard.header.label}</h4>
        <h5 className={classes.card_price}>{contentCard.header.value}</h5>
        <Row className={classes.card_items}>
          {contentCard.items.map((i: any, idx: number) => (
            <Col xs={12} key={idx}>
              {i.check ? (
                <CheckCircleFill className={classes.card_items_include} />
              ) : (
                <XCircleFill className={classes.card_items_noinclude} />
              )}
              {i.label}
            </Col>
          ))}
        </Row>
        <Row className='mt-5'>
          <Col xs={12}>
            <Button className={classes.button_small} onClick={handleShowModal}>
              {contentCard.button.label}
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
        centered
        className={classes.modal}
        show={showModal}
        onHide={handleCloseModal}
        size='lg'>
        <Modal.Body>
          <PaymentMethodCard
            handleCloseModal={handleCloseModal}
            content={contentMethod}
          />
        </Modal.Body>
      </Modal>
    </Container>
  )
}

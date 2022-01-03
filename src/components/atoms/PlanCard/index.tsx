// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'

// styles
import classes from 'styles/Choose-plan/page.module.scss'

// types
import { FC } from 'react'

export const PlanCard: FC<{ selected?: boolean }> = ({ selected }) => (
  <Container className={selected ? classes.banner_selected : classes.banner}>
    <div className={classes.card}>
      <h4 className={classes.card_title}>Demo</h4>
      <h5 className={classes.card_price}>120$</h5>
      <Row className={classes.card_items}>
        <Col xs={12}>
          <CheckCircleFill className={classes.card_items_include} /> Lorem ipsum
        </Col>
        <Col xs={12}>
          <CheckCircleFill className={classes.card_items_include} /> Lorem ipsum
        </Col>
        <Col xs={12}>
          <XCircleFill className={classes.card_items_noinclude} /> Lorem ipsum
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs={12}>
          <Button className={classes.button_small}>Adquirir</Button>
        </Col>
      </Row>
    </div>
  </Container>
)

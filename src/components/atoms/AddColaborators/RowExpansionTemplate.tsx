// bootstrap components
import { Container, Row, Col, Badge } from 'react-bootstrap'

// styles
import classes from 'styles/Colaborators/addPage.module.scss'

// types
import { FC } from 'react'
import { InvitedColaboratorType } from 'types/models/Colaborator'

export const rowExpansionTemplate: FC<
  InvitedColaboratorType & {
    status: boolean
    labelPositon: string
    labelDepartment: string
    labelStatus: string
    stateSent: string
  }
> = (props) => (
  <Container className={classes.section}>
    <Row>
      <Col className='text-center' md={12} lg={4}>
        <h5>{props.labelDepartment}</h5>
        <p>{props.department}</p>
      </Col>
      <Col className='text-center' md={12} lg={4}>
        <h5>{props.labelPositon}</h5>
        <p>{props.position}</p>
      </Col>
      <Col className='text-center' md={12} lg={4}>
        <h5>{props.labelStatus}</h5>
        <Badge bg={props.status ? 'success' : 'danger'}>
          {props.status ? props.stateSent : 'Error'}
        </Badge>
      </Col>
    </Row>
  </Container>
)

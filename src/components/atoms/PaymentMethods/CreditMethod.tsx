// main tools
import { useState } from 'react'

// prime components
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// styles
import classes from 'styles/CreditMethod/creditMethod.module.scss'

// Types
import { FC } from 'react'
import { ChangeType } from 'types'
import { InputMaskChangeParams } from 'primereact/inputmask'

export const CreditMethod: FC<{ content: any }> = ({ content }) => {
  const [data, setData] = useState({
    name: '',
    cardNumber: '',
    expiredDate: '',
    cvc: '',
  })

  const label = {
    fullName: content.input1,
    cardNumber: content.input2,
    expiredDate: content.input3,
    cvc: content.input4,
  }

  const handleChange = (ev: ChangeType | InputMaskChangeParams) => {
    setData({ ...data, [ev.target.name]: ev.target.value })
  }

  return (
    <>
      <p className={classes.payment_title}>{content.title}</p>
      <Container as='form'>
        <Row>
          <Col xs={12}>
            <InputText
              name='name'
              value={data.name}
              className={classes.input}
              placeholder={label.fullName}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12}>
            <InputMask
              name='cardNumber'
              onChange={handleChange}
              value={data.cardNumber}
              className={classes.input}
              mask='9999 9999 9999 9999'
              placeholder={label.cardNumber}
            />
          </Col>
          <Col xs={6}>
            <InputMask
              name='expiredDate'
              mask='99/99/9999'
              onChange={handleChange}
              value={data.expiredDate}
              className={classes.input}
              placeholder={label.expiredDate}
            />
          </Col>
          <Col xs={6}>
            <InputMask
              name='cvc'
              mask='999'
              value={data.cvc}
              placeholder={label.cvc}
              className={classes.input}
              onChange={handleChange}
            />
          </Col>
          <Col className='text-end'>
            <Button className={classes.button}>{content.button.label}</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

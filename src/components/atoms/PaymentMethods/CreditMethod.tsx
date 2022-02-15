// main tools
import { useState } from 'react'

// prime components
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// styles
import classes from 'styles/PaymentMethodCard/paymentMethodCard.module.scss'

// Types
import { FC } from 'react'
import { ChangeType, SubmitType } from 'types'
import { InputMaskChangeParams } from 'primereact/inputmask'

export const CreditMethod: FC<{ content: any }> = ({ content }) => {
  const [data, setData] = useState({
    name: '',
    cardNumber: '',
    expiredDate: '',
    cvc: '',
  })

  const handleChange = (ev: ChangeType | InputMaskChangeParams) =>
    setData({ ...data, [ev.target.name]: ev.target.value })

  const handleSubmit = (ev: SubmitType) => {
    ev.preventDefault()

    console.log(content.paymentMethodLabel)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <p className={classes.subtitle}>{content.paymentMethodLabel}</p>
        <Col xs={12}>
          <InputText
            required
            name='name'
            value={data.name}
            onChange={handleChange}
            className={classes.input}
            placeholder={content.nameInput.placeholder}
          />
        </Col>
        <Col xs={12}>
          <InputMask
            required
            name='cardNumber'
            onChange={handleChange}
            value={data.cardNumber}
            className={classes.input}
            mask='9999 9999 9999 9999'
            placeholder={content.cardInput.placeholder}
          />
        </Col>
        <Col xs={6}>
          <InputMask
            required
            mask='99/99/9999'
            name='expiredDate'
            onChange={handleChange}
            value={data.expiredDate}
            className={classes.input}
            placeholder={content.expireDateInput.placeholder}
          />
        </Col>
        <Col xs={6}>
          <InputMask
            required
            name='cvc'
            mask='999'
            value={data.cvc}
            onChange={handleChange}
            className={classes.input}
            placeholder={content.cvcInput.placeholder}
          />
        </Col>
        <Button type='submit' className={classes.button}>
          {content.submitButton.label}
        </Button>
      </Row>
    </form>
  )
}

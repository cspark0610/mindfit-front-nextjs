// main tools
import { useState } from 'react'

// prime components
import { InputText } from 'primereact/inputtext'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// styles
import classes from 'styles/PaymentMethodCard/paymentMethodCard.module.scss'

// types
import { FC } from 'react'
import { ChangeType, SubmitType } from 'types'

export const PaypalMethod: FC<{ content: any }> = ({ content }) => {
  const [data, setData] = useState({
    email: '',
  })

  const handleChange = (ev: ChangeType) =>
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
            name='email'
            value={data.email}
            onChange={handleChange}
            className={classes.input}
            placeholder={content.emailInput.placeholder}
          />
        </Col>
        <Button type='submit' className={classes.button}>
          {content.submitButton.label}
        </Button>
      </Row>
    </form>
  )
}

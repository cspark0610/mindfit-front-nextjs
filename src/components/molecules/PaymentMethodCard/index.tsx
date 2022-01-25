// Main utils
import { useState } from 'react'

// Components
import { CreditCard, Paypal } from 'react-bootstrap-icons'

// bootstrap components
import { Container, Row, Button } from 'react-bootstrap'
import { ChevronLeft } from 'react-bootstrap-icons'

// styles
import classes from 'styles/PaymentMethodCard/paymentMethodCard.module.scss'

// types
import { FC } from 'react'
import { CreditMethod, PaypalMethod } from 'components/atoms/PaymentMethods'

interface props {
  handleCloseModal: () => void
  content: any
}

export const PaymentMethodCard: FC<props> = ({ handleCloseModal, content }) => {
  const [paymentOption, setPaymentOption] = useState('')
  return (
    <Container className='py-2 p-md-4 p-lg-5'>
      <Button
        className={`rounded-circle d-flex ${classes.button_close}`}
        onClick={handleCloseModal}>
        <ChevronLeft width={32} height={32} />
      </Button>
      <h2 className={classes.title}>{content.method.title}</h2>
      <p className={`text-center mb-5 ${classes.subtitle}`}>
        {content.method.subtitle}
      </p>
      <Row xs={2}>
        <CreditCard
          className={`${classes.option} ${
            paymentOption === 'creditCard' && classes.option_selected
          }`}
          width={70}
          height={52}
          onClick={() => setPaymentOption('creditCard')}
        />
        <Paypal
          className={`${classes.option} ${
            paymentOption === 'paypal' && classes.option_selected
          }`}
          width={70}
          height={52}
          onClick={() => setPaymentOption('paypal')}
        />
      </Row>
      <Row>
        {paymentOption === 'creditCard' && (
          <CreditMethod content={content.credit} />
        )}
        {paymentOption === 'paypal' && <PaypalMethod />}
      </Row>
    </Container>
  )
}

import { PaypalMethod } from './PaypalMethod'
import { CreditMethod } from './CreditMethod'

// bootstrap components
import { Container } from 'react-bootstrap'

// types
import { FC } from 'react'

export const PaymentMehthods: FC<{ content: any }> = ({ content }) => {
  const methods = {
    credit: <CreditMethod content={content} />,
    paypal: <PaypalMethod content={content} />,
  }

  return (
    <Container>
      {methods[content.paymentMethod as keyof typeof methods]}
    </Container>
  )
}

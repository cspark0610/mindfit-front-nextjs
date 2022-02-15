// Main utils
import Image from 'next/image'

// Components
import { PaymentMehthods } from 'components/atoms/PaymentMethods'

// bootstrap components
import { Container, Button, Tabs, Tab } from 'react-bootstrap'
import { ChevronLeft } from 'react-bootstrap-icons'

// styles
import classes from 'styles/PaymentMethodCard/paymentMethodCard.module.scss'

// types
import { FC } from 'react'

interface props {
  handleCloseModal: () => void
  content: any
}

export const PaymentMethodCard: FC<props> = ({ handleCloseModal, content }) => (
  <Container className='py-2 p-md-4 p-lg-5'>
    <Button className={classes.button_close} onClick={handleCloseModal}>
      <ChevronLeft width={32} height={32} />
    </Button>
    <h2 className={classes.title}>{content.title}</h2>
    <Tabs className={classes.tabs} defaultActiveKey='credit'>
      {content.paymentMethods.data.map(({ attributes }: any) => (
        <Tab
          tabClassName={classes.tabs_item}
          key={attributes.paymentMethod}
          eventKey={attributes.paymentMethod}
          title={
            <Image
              width={60}
              height={60}
              src={attributes.methodIcon.data.attributes.url}
              alt={attributes.methodIcon.data.attributes.caption}
            />
          }>
          <PaymentMehthods
            content={{ ...attributes, submitButton: content.submitButton }}
          />
        </Tab>
      ))}
    </Tabs>
  </Container>
)

// main tools
import Image from 'next/image'

// Bootstrap components
import { Button, Col, Row } from 'react-bootstrap'

// Primeicons
import { PrimeIcons } from 'primereact/api'

// styles
import classes from 'styles/CardHistory/cardHistory.module.scss'

// types
import { FC } from 'react'

export const CardHistory: FC = () => {
  return (
    <section className={`p-4 text-center ${classes.section}`}>
      <div className='mb-4'>
        <Image
          width={100}
          height={100}
          alt='avatar'
          layout='intrinsic'
          src='/assets/images/userAvatar.svg'
        />
      </div>
      <h2 className={`fs-5 fw-bold ${classes.title}`}>Session de coachee</h2>
      <p className={classes.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </p>
      <Row md={2}>
        <Col>
          <i className={`me-2 ${classes.icon} ${PrimeIcons.CALENDAR}`} />
          23/02/2022
        </Col>
        <Col>
          <Button className={classes.button} variant='secondary'>
            Ver
          </Button>
        </Col>
      </Row>
    </section>
  )
}

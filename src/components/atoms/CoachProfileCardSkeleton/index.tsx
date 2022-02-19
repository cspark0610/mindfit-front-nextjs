// bootstrap components
import { Container, Col, Row } from 'react-bootstrap'

// prime components
import { Skeleton } from 'primereact/skeleton'

import classes from 'styles/CoachProfileCardSkeleton/styles.module.scss'

// types
import { FC } from 'react'

export const CoachProfileCardSkeleton: FC = () => (
  <Container className={classes.section}>
    <Row className='justify-content-center'>
      <Skeleton shape='circle' height='180px' width='180px' />
    </Row>
    <Row className='mt-4 justify-content-center'>
      <Skeleton height='130px' width='180px' />
    </Row>
    <Row className='mt-4 justify-content-center'>
      <Skeleton className='my-1' height='30px' width='100%' />
      <Skeleton className='my-1' height='15px' width='100%' />
      <Skeleton className='my-1' height='15px' width='100%' />
      <Skeleton className='my-1' height='15px' width='100%' />
      <Skeleton className='my-1' height='15px' width='100%' />
    </Row>
    <Row className='mt-4'>
      <Col xs={6}>
        <Skeleton height='100px' width='80px' />
      </Col>
      <Col xs={6}>
        <Skeleton height='100px' width='80px' />
      </Col>
    </Row>
  </Container>
)

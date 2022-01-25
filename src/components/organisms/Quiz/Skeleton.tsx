// bootstrap components
import { Row, Col } from 'react-bootstrap'

// prime components
import { Skeleton } from 'primereact/skeleton'

// types
import { FC } from 'react'

export const QuizSkeleton: FC = () => (
  <Row>
    <Col className='mb-4' xs={12}>
      <Skeleton width='100%' height='2rem' borderRadius='16px' />
    </Col>
    <Col className='mb-4' xs={12}>
      <Skeleton width='100%' height='30rem' borderRadius='16px' />
    </Col>
    <Col xs={12} md={6}>
      <Skeleton width='100%' height='3rem' borderRadius='16px' />
    </Col>
    <Col xs={12} md={6}>
      <Skeleton width='100%' height='3rem' borderRadius='16px' />
    </Col>
  </Row>
)

// bootstrap components
import { Row } from 'react-bootstrap'

// prime components
import { Skeleton } from 'primereact/skeleton'

export const CoachingFeedbackSkeleton = () => {
  return (
    <>
      <Row className='justify-content-center'>
        <Skeleton className='mb-2' width='50%' />
        <Skeleton className='mb-2' width='60%' />
        <Skeleton width='100%' height='150px' />
      </Row>
      <Row className='justify-content-end mt-3'>
        <Skeleton width='4rem' height='2rem' />
      </Row>
    </>
  )
}

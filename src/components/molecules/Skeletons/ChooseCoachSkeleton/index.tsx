// bootstrap components
import { Col, Row } from 'react-bootstrap'

// PrimeComponents
import { Skeleton } from 'primereact/skeleton'

// Style
import classes from 'styles/ChooseCoachSkeleton/chooseCoachSkeleton.module.scss'

export const ChooseCoachSkeleton = () => {
  const skeletons = [1, 2, 3]
  return (
    <Row className='justify-content-center mt-5'>
      <Col className='mt-5' xs={12} md={9}>
        <Row className='mt-3'>
          {skeletons.map((skeleton) => (
            <Col key={skeleton} className='mb-4' xs={12} md={6}>
              <div className={`${classes.skeleton_card} p-3 d-flex`}>
                <div>
                  <Skeleton shape='circle' width='100px' height='6rem' />
                  <Skeleton
                    width='100px'
                    height='6rem'
                    borderRadius='18px'
                    className='mt-3'
                  />
                </div>
                <div className='mx-4 w-100'>
                  <Skeleton width='100%' height='1rem' className='mb-1' />
                  <Skeleton width='100%' height='1rem' className='mb-1' />
                  <Skeleton width='100%' height='1rem' className='mb-1' />
                  <Skeleton width='100%' height='1rem' className='mb-1' />
                  <Skeleton width='100%' height='1rem' className='mb-1' />
                  <Skeleton width='100%' height='3rem' className='mt-5' />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

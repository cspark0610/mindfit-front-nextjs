// Main tools
import Image from 'next/image'

// Bootstrap component
import { Container, Row, Col } from 'react-bootstrap'

// Styles
import classes from 'styles/RecommendedContentItem/recommendedContentItem.module.scss'

// Type
import { FC } from 'react'

export const RecommendedContentItem: FC = () => {
  return (
    <div className={classes.section}>
      <Image
        src='/static/icon/MINDFIT.svg'
        width={220}
        height={211}
        alt='image'
        className={classes.image}
      />
      <Container fluid>
        <Row className={`text-center align-items-center ${classes.card_info}`}>
          <Col xs={3} className={`px-0 ${classes.card_type}`}>
            <i className='pi pi-book' />
            <p className={`my-0 `}>ARTICULO</p>
          </Col>
          <Col xs={6} className='px-0'>
            <p className={`my-0 px-0 ${classes.card_title}`}>
              Motivacion para la vida
            </p>
          </Col>
          <Col xs={3}>
            <Row className='px-0 justify-content-center'>
              <div className={`px-0 ${classes.card_time}`}>
                <p className='my-0'>10</p>
                <p className='my-0'>min</p>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

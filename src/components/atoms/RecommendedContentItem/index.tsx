// Main tools
import Link from 'next/link'
import Image from 'next/image'

// Bootstrap component
import { Container, Row, Col } from 'react-bootstrap'

// Primeicons
import { PrimeIcons } from 'primereact/api'

// Styles
import classes from 'styles/RecommendedContentItem/recommendedContentItem.module.scss'

// Type
import { FC } from 'react'

export const RecommendedContentItem: FC<{ attributes: any; id: number }> = ({
  id,
  attributes,
}) => (
  <Link href={`library/${id}`}>
    <a className={classes.section}>
      <Image
        alt='image'
        width={220}
        height={211}
        className={classes.image}
        src={attributes.mainImage.data.attributes.url}
      />
      <Container fluid>
        <Row className={`text-center align-items-center ${classes.card_info}`}>
          <Col xs={3} className={`px-0 ${classes.card_type}`}>
            <i className={PrimeIcons.BOOK} />
            <p className={`my-0 `}>ARTICULO</p>
          </Col>
          <Col xs={6} className='px-0'>
            <div
              className={`my-0 px-0 ${classes.card_title}`}
              dangerouslySetInnerHTML={{ __html: attributes.title }}
            />
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
    </a>
  </Link>
)

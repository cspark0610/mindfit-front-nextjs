// Main tools

// Components
import { RecommendedContentItem } from 'components/atoms/RecommendedContentItem'

// Style
import classes from 'styles/RecommendedContentList/recommendedContentList.module.scss'

// Bootstrap components
import { Container, Row } from 'react-bootstrap'

// Types
import { FC } from 'react'

export const RecommendedContentList: FC = () => {
  return (
    <div className='mb-5'>
      <p className={`fw-bold fs-5 mb-5 ${classes.section_title}`}>
        Contenidos Recomendados
      </p>
      <Container fluid>
        <Row className='justify-content-center'>
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
          <RecommendedContentItem />
        </Row>
      </Container>
    </div>
  )
}

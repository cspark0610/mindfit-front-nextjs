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
    <div>
      <p className={classes.section_title}>Contenidos recomendados</p>
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

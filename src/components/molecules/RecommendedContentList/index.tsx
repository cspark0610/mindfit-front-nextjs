// main tools
import { useRouter } from 'next/router'

// gql
import { useQuery } from '@apollo/client'
import POSTS from 'lib/strapi/queries/Library/post.gql'

// Components
import { RecommendedContentItem } from 'components/atoms/RecommendedContentItem'

// utils
import { microServices } from 'commons'

// Style
import classes from 'styles/RecommendedContentList/recommendedContentList.module.scss'

// Bootstrap components
import { Container, Row } from 'react-bootstrap'

// prime components
import { Skeleton } from 'primereact/skeleton'

// Types
import { FC } from 'react'

export const RecommendedContentList: FC = () => {
  const { locale } = useRouter()

  const { data, loading } = useQuery(POSTS, {
    context: { ms: microServices.strapi },
    variables: { locale, filters: {} },
  })

  return (
    <div>
      <p className={classes.section_title}>Contenidos recomendados</p>
      <Container fluid>
        <Row>
          {loading
            ? [0, 1].map((idx) => (
                <Skeleton
                  key={idx}
                  width='20rem'
                  height='11rem'
                  className='m-2'
                />
              ))
            : data.posts.data.map((post: any) => (
                <RecommendedContentItem key={post.id} {...post} />
              ))}
        </Row>
      </Container>
    </div>
  )
}

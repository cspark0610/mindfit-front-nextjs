// main tools
import { useRouter } from 'next/router'
import { useState } from 'react'

// gql
import GET_PROFILE from 'lib/queries/Coachee/getCoacheeProfile.gql'
import POSTS from 'lib/strapi/queries/Library/getListsOfPosts.gql'
import { useQuery, useLazyQuery } from '@apollo/client'

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

export const RecommendedContentList: FC<{ content: any }> = ({ content }) => {
  const [posts, setPosts] = useState<any>(undefined)
  const { locale } = useRouter()

  const [getPosts] = useLazyQuery(POSTS, {
    context: { ms: microServices.strapi },
  })
  useQuery(GET_PROFILE, {
    context: { ms: microServices.backend },
    onCompleted: async (res) => {
      const { data } = await getPosts({
        variables: {
          locale,
          filter: {},
        },
      })
      setPosts(data.posts)
    },
  })

  return (
    <div>
      <p className={classes.section_title}>{content.recommendedContentLabel}</p>
      <Container fluid>
        <Row>
          {posts === undefined
            ? [0, 1].map((idx) => (
                <Skeleton
                  key={idx}
                  width='20rem'
                  height='11rem'
                  className='m-2'
                />
              ))
            : posts.data.map((post: any) => (
                <RecommendedContentItem key={post.id} {...post} />
              ))}
        </Row>
      </Container>
    </div>
  )
}

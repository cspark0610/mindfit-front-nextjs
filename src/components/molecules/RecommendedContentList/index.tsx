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
  const { locale } = useRouter()

  const [getPosts, { data, loading }] = useLazyQuery(POSTS, {
    context: { ms: microServices.strapi },
  })

  useQuery(GET_PROFILE, {
    context: { ms: microServices.backend },
    onCompleted: ({ getCoacheeProfile }) => {
      getPosts({
        variables: {
          locale,
          filters: {
            postCategories: {
              postCoachingAreas: {
                codename: {
                  in: getCoacheeProfile.coachingAreas.map(
                    (area: { codename: string }) => area.codename
                  ),
                },
              },
            },
          },
        },
      })
    },
  })

  return (
    <div>
      <p className={classes.section_title}>{content.recommendedContentLabel}</p>
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
            : data?.posts.data.map((post: any) => (
                <RecommendedContentItem key={post.id} {...post} />
              ))}
        </Row>
      </Container>
    </div>
  )
}

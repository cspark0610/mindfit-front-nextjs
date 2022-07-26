// main tools
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container, Row, Col, Spinner } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { ArticleCard } from 'components/atoms/ArticleCard'
import { Filter } from 'components/organisms/Library/filter'

// gql
import { useQuery } from '@apollo/client'
import { initializeApolloClient } from 'lib/apollo'
import GET_LISTS_OF_POSTS from 'lib/strapi/queries/Library/getListsOfPosts.gql'
import GET_CONTENT from 'lib/strapi/queries/Library/page.gql'

// commons
import { microServices } from 'commons'

// styles
import classes from 'styles/Library/page.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const LibraryPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
  defaultCategory,
  postsCategories,
}) => {
  const [posts, setPosts] = useState([])
  const { locale } = useRouter()

  const { loading, refetch } = useQuery(GET_LISTS_OF_POSTS, {
    context: { ms: microServices.strapi },
    variables: { locale: locale, filters: {} },
    onCompleted: (data) => setPosts(data.posts.data),
  })

  return (
    <Layout>
      <Container className={classes.container}>
        <section className={classes.section}>
          <h1 className={classes.title}>{content.title}</h1>
          <Filter
            postCategories={postsCategories}
            defaultCategory={defaultCategory as string}
            placeholder={content.searchInput.placeholder}
            refetch={(data) => refetch({ filters: data })}
          />
          <Row>
            {!loading ? (
              posts.length ? (
                posts.map((article: any) => (
                  <Col className='my-3' key={article.id} md={6} lg={3}>
                    <ArticleCard {...article} />
                  </Col>
                ))
              ) : (
                <h6>{content.emptyLabel}</h6>
              )
            ) : (
              <Spinner animation='border' />
            )}
          </Row>
        </section>
        <ExploreBadge />
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: GET_LISTS_OF_POSTS,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })
  const { data: content } = await apolloClient.query({
    query: GET_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const postsCategories = (() => {
    const postsCategories = data.posts.data.map(({ attributes }: any) =>
      attributes.postCategories.data.map(
        (category: any) => category.attributes.category
      )
    )
    return postsCategories.reduce(
      (prev: string[], curr: string[]) => prev.concat(curr),
      []
    )
  })()

  const defaultCategory = !ctx.query.category ? '' : ctx.query.category

  return {
    props: {
      defaultCategory: defaultCategory,
      postsCategories: postsCategories.filter(
        (item: any, idx: number) => postsCategories.indexOf(item) === idx
      ),
      content: content.digitalLibrary.data.attributes,
    },
  }
}

export default LibraryPage

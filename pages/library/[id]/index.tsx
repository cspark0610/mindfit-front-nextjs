// main tools
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

// bootstrap components
import { JournalText } from 'react-bootstrap-icons'
import { Container, Row, Col, Badge, Spinner } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { ArticleCard } from 'components/atoms/ArticleCard'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// 'commons'
import { microServices } from 'commons'

// gql
import { useQuery } from '@apollo/client'
import { initializeApolloClient } from 'lib/apollo'
import GET_LISTS_OF_POSTS from 'lib/strapi/queries/Library/getListsOfPosts.gql'
import POST from 'lib/strapi/queries/Library/post.gql'

// styles
import classes from 'styles/Library/entry.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'
import { getSession } from 'next-auth/react'

const LibraryArticlePage: NextPage<
  GetSSPropsType<typeof getServerSideProps>
> = ({ content }) => {
  const [posts, setPosts] = useState([])
  const { query, locale } = useRouter()

  const postCategory = content.postCategories.data.map(
    (category: any) => category.attributes.category
  )

  const { loading } = useQuery(GET_LISTS_OF_POSTS, {
    context: { ms: microServices.strapi },
    variables: {
      locale: locale,
      filters: {
        postCategories: { category: { in: postCategory } },
        not: { id: { eq: query.id } },
      },
    },
    onCompleted: (data) => setPosts(data.posts.data),
  })

  return (
    <Layout>
      {!loading ? (
        <Container className={classes.container}>
          <section className={classes.section}>
            <header className={classes.header}>
              <h1
                className={classes.title}
                dangerouslySetInnerHTML={{ __html: content.title }}
              />
              {content.badge && (
                <Badge as='span' className={classes.badge} bg='secondary'>
                  {content.badge}
                  {content.duration && (
                    <Badge as='span' bg='secondary'>
                      - {content.duration}
                      min
                    </Badge>
                  )}
                </Badge>
              )}
            </header>
            <Row>
              <Col className={classes.owner} xs={12} md={8} lg={6} xl={4}>
                <Image
                  src='/assets/images/avatar.png'
                  alt='avatar'
                  width={64}
                  height={64}
                  layout='fixed'
                  className={classes.avatar}
                />
                <div className='ps-4'>
                  <span className={classes.name}>María Hidalogo</span>
                  <span className={classes.position}>
                    Especialista en disciplina
                  </span>
                </div>
              </Col>
            </Row>
            <div className='mt-5'>
              {postCategory.map((category: string, idx: number) => (
                <Badge className='mx-2 px-3' key={idx}>
                  {category}
                </Badge>
              ))}
            </div>
            <article
              className='mt-5'
              dangerouslySetInnerHTML={{ __html: content.article?.body }}
            />
            <footer>
              <h3 className={classes.related}>Articulos relacionados</h3>
              <Row>
                {posts.length ? (
                  posts.map((article: any) => (
                    <Col className='my-3' key={article.id} md={6} lg={3}>
                      <ArticleCard {...article} />
                    </Col>
                  ))
                ) : (
                  <h6>No hay articulos relacionados</h6>
                )}
              </Row>
            </footer>
          </section>
          <ExploreBadge />
        </Container>
      ) : (
        <Spinner animation='border' />
      )}
    </Layout>
  )
}

// export const getStaticPaths = async (ctx: GetStaticPathsContext) => {
//   const apolloClient = initializeApolloClient()
//   const { data } = await apolloClient.query({
//     query: GET_LISTS_OF_POSTS,
//     variables: { locale: ctx.locales, filters: {} },
//     context: { ms: microServices.strapi },
//   })

//   const paths = data.posts.data.map((post: any) => {
//     return { params: { id: post.id } }
//   })
//   return { paths, fallback: false }
// }

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: POST,
    variables: { locale: ctx.locale, id: ctx.params?.id },
    context: { ms: microServices.strapi },
  })

  return { props: { content: data.post.data.attributes } }
}

export default LibraryArticlePage

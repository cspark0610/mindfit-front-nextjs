// main tools
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
import GET_LISTS_OF_POSTS from 'lib/strapi/queries/Library/getListsOfPosts.gql'
import POST from 'lib/strapi/queries/Library/post.gql'

// styles
import classes from 'styles/Library/entry.module.scss'

// types
import { NextPage } from 'next'

const LibraryArticlePage: NextPage = () => {
  const [categories, setCategories] = useState([])
  const [posts, setPosts] = useState([])
  const { query } = useRouter()

  const { data, loading } = useQuery(POST, {
    context: { ms: microServices.strapi },
    variables: {
      locale: 'es',
      id: query.id,
    },
    onCompleted: (data) => {
      const post = data.post.data.attributes
      const postCategory = post.postCategories.data.map(
        (category: any) => category.attributes.category
      )
      setCategories(postCategory)
    },
  })

  useQuery(GET_LISTS_OF_POSTS, {
    context: { ms: microServices.strapi },
    variables: {
      locale: 'es',
      filters: {
        postCategories: { category: { in: categories } },
        not: { id: { eq: query.id } },
      },
    },
    skip: loading,
    onCompleted: (data) => {
      setPosts(data.posts.data)
    },
  })

  const post = data?.post.data.attributes

  return (
    <Layout>
      {!loading ? (
        <Container className={classes.container}>
          <section className={classes.section}>
            <header className={classes.header}>
              <h1
                className={classes.title}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              <Badge as='span' className={classes.badge} bg='secondary'>
                {post.badge.label}
                <br />
                <JournalText />
              </Badge>
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
              {post.postCategories.data.map((category: any, idx: number) => (
                <Badge className='mx-2 px-3' key={idx}>
                  {category.attributes.category}
                </Badge>
              ))}
            </div>
            <article
              className='mt-5'
              dangerouslySetInnerHTML={{ __html: post.article.body }}
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

export default LibraryArticlePage

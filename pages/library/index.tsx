// main tools
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col, Spinner } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { ArticleCard } from 'components/atoms/ArticleCard'
import { Filter } from 'components/organisms/Library/filter'

// gql
import { useQuery } from '@apollo/client'
import POSTS from 'lib/strapi/queries/Library/content.gql'

// commons
import { microServices } from 'commons'

// styles
import classes from 'styles/Library/page.module.scss'

// types
import { NextPage } from 'next'

const LibraryPage: NextPage = () => {
  const [content, setContent] = useState([])

  const { loading, refetch } = useQuery(POSTS, {
    context: { ms: microServices.strapi },
    variables: {
      locale: 'es',
      filters: {},
    },
    onCompleted: (data) => {
      setContent(data.posts.data)
    },
  })

  return (
    <Layout>
      <Container className={classes.container}>
        <section className={classes.section}>
          <h1 className={classes.title}>Biblioteca digital</h1>
          <Filter refetch={(data) => refetch({ filters: data })} />
          <Row>
            {!loading ? (
              content.length != 0 ? (
                content.map((article: any) => (
                  <Col className='my-3' key={article.id} md={6} lg={3}>
                    <ArticleCard {...article} />
                  </Col>
                ))
              ) : (
                <h6>No hay articulos relacionados</h6>
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

export default LibraryPage

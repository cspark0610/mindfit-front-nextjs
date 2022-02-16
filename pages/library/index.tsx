// main tools
import { ComponentType, useEffect, useState } from 'react'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

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
  const [filter, seFilter] = useState({})

  const { data, loading } = useQuery(POSTS, {
    context: { ms: microServices.strapi },
    variables: {
      locale: 'en',
      filters: filter,
    },
  })

  const refetch = (data: string) => {
    seFilter(data)
  }

  useEffect(() => {
    if (data) {
      setContent(data.posts.data)
    }
  }, [data])

  return (
    <Layout>
      <Container className={classes.container}>
        <section className={classes.section}>
          <h1 className={classes.title}>Biblioteca digital</h1>
          <Filter refetch={refetch} />
          <Row>
            {!loading &&
              content.map((article: any) => (
                <Col className='my-3' key={article.id} md={6} lg={3}>
                  <ArticleCard {...article} />
                </Col>
              ))}
          </Row>
        </section>
        <ExploreBadge />
      </Container>
    </Layout>
  )
}

export default LibraryPage

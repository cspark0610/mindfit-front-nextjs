// main tools
import { useEffect, useState } from 'react'

// bootstrap components
import { Container, Row, Col, Spinner } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { ArticleCard } from 'components/atoms/ArticleCard'
import { Filter } from 'components/organisms/Library/filter'

// gql
import { useQuery } from '@apollo/client'
import GET_LISTS_OF_POSTS from 'lib/strapi/queries/Library/getListsOfPosts.gql'
import POST_CATEGORIES from 'lib/strapi/queries/Library/postCategories.gql'

// commons
import { microServices } from 'commons'

// styles
import classes from 'styles/Library/page.module.scss'

// types
import { NextPage } from 'next'

const LibraryPage: NextPage = () => {
  const [categories, setCategories] = useState([])
  const [posts, setPosts] = useState([])

  const { loading, refetch } = useQuery(GET_LISTS_OF_POSTS, {
    context: { ms: microServices.strapi },
    variables: {
      locale: 'es',
      filters: {},
    },
    onCompleted: (data) => {
      setPosts(data.posts.data)
      const postsCategories = data.posts.data.map((post: any) =>
        post.attributes.postCategories.data.map(
          (category: any) => category.attributes.category
        )
      )
      if (!categories.length) {
        const inputCategories = postsCategories.reduce(
          (prev: string[], curr: string[]) => prev.concat(curr),
          []
        )
        setCategories(inputCategories)
      }
    },
  })

  return (
    <Layout>
      <Container className={classes.container}>
        <section className={classes.section}>
          <h1 className={classes.title}>Biblioteca digital</h1>
          {
            <Filter
              postCategories={categories}
              refetch={(data) => refetch({ filters: data })}
            />
          }
          <Row>
            {!loading ? (
              posts.length ? (
                posts.map((article: any) => (
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

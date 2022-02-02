// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { ArticleCard } from 'components/atoms/ArticleCard'
import { Filter } from 'components/organisms/Library/filter'

// styles
import classes from 'styles/Library/page.module.scss'

// types
import { NextPage } from 'next'
import { SubmitType } from 'types'

const LibraryPage: NextPage = () => {
  const refetch = () => console.log('QUERY')

  return (
    <Layout>
      <Container className={classes.container}>
        <section className={classes.section}>
          <h1 className={classes.title}>Biblioteca digital</h1>
          <Filter refetch={refetch} />
          <Row>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((article) => (
              <Col className='my-3' key={article} md={6} lg={3}>
                <ArticleCard />
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

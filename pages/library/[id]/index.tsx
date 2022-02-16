// main tools
import Image from 'next/image'
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
import POSTS from 'lib/strapi/queries/Library/content.gql'

// styles
import classes from 'styles/Library/entry.module.scss'

// types
import { NextPage } from 'next'

const LibraryArticlePage: NextPage = () => {
  const [content, setContent] = useState([])

  const { loading } = useQuery(POSTS, {
    context: { ms: microServices.strapi },
    variables: {
      locale: 'es',
      filters: { postCategories: { category: { eq: 'Autoayuda' } } },
    },
    onCompleted: (data) => {
      setContent(data.posts.data)
    },
  })

  return (
    <Layout>
      <Container className={classes.container}>
        <section className={classes.section}>
          <header className={classes.header}>
            <h1 className={classes.title}>Retomar habitos</h1>
            <Badge as='span' className={classes.badge} bg='secondary'>
              6 min
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
            {['Autoayuda', 'Motivación', 'Responsabilidad Social'].map(
              (category, idx: number) => (
                <Badge className='mx-2 px-3' key={idx}>
                  {category}
                </Badge>
              )
            )}
          </div>
          <article className='mt-5'>
            <Row className='mb-5'>
              <Col md={6}>
                <Image
                  src='/assets/images/article.png'
                  alt='Retomar habitos'
                  width={540}
                  height={323}
                  className={classes.mainImage}
                />
              </Col>
              <Col md={6}>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus id quod maxime placeat facere possimus,
                  omnis voluptas assumenda est, omnis dolor repellendus.
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae sint
                  et molestiae non recusandae. Itaque earum rerum hic tenetur a
                  sapiente delectus, ut aut reiciendis voluptatibus maiores
                  alias consequatur aut perferendis doloribus asperiores
                  repellat
                </p>
              </Col>
              <Col className='my-4'>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus id quod maxime placeat facere possimus,
                  omnis voluptas assumenda est, omnis dolor repellendus.
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae sint
                  et molestiae non recusandae. Itaque earum rerum hic tenetur a
                  sapiente delectus, ut aut reiciendis voluptatibus maiores
                  alias consequatur aut perferendis doloribus asperiores
                  repellat
                </p>
              </Col>
            </Row>
            <Row>
              <Col className='text-center' xs={12}>
                <Image
                  src='/assets/icon/MINDFIT.svg'
                  alt='Retomar habitos'
                  width={540}
                  height={323}
                />
              </Col>
            </Row>
          </article>
          <footer>
            <h3 className={classes.related}>Articulos relacionados</h3>
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
          </footer>
        </section>
        <ExploreBadge />
      </Container>
    </Layout>
  )
}

export default LibraryArticlePage

// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// components
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'
import { CardHistory } from 'components/molecules/CardHistory'
import { Evaluation } from 'components/molecules/Evaluation'
import { Layout } from 'components/organisms/Layout'
import { Notes } from 'components/molecules/Notes'

// utils
import { microServices } from 'commons'

// apollo
import GET_CONTENT from 'lib/strapi/queries/Coachee/detailContent.gql'
import GET_COACHEE_BY_ID from 'lib/queries/Coachee/getById.gql'
import { createApolloClient } from 'lib/apolloClient'
import { initializeApolloClient } from 'lib/apollo'

// styles
import classes from 'styles/DetailCoachee/detailCoachee.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const DetailCoachee: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coachee,
  content,
}) => (
  <Layout>
    <Container>
      <Row>
        <CoacheeProfileCard
          coachee={coachee}
          content={content.coacheeCard.data.attributes}
        />
        <Col md={6} className='pt-4'>
          <Container className={`p-5 ${classes.section}`}>
            <Evaluation preview content={content} />
          </Container>
        </Col>
        <Col md={12} lg={3} className='pt-4'>
          <Container className={`p-4 ${classes.section}`}>
            <Notes coachee={coachee} content={content} />
          </Container>
        </Col>
      </Row>
      <Row className='pt-4 pb-4'>
        <h3 className={classes.title}>{content.historyLabel}</h3>
        {[0, 1, 2, 3].map((item) => (
          <Col xs={6} lg={3} key={item} className='mt-4'>
            <CardHistory content={content} />
          </Col>
        ))}
      </Row>
    </Container>
  </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }

  const apollo = createApolloClient(session.token)
  const { data } = await apollo.query({
    query: GET_COACHEE_BY_ID,
    variables: { id: parseInt(ctx.params?.id as string) },
    context: { ms: microServices.backend },
  })

  const apolloClient = initializeApolloClient()
  const { data: content } = await apolloClient.query({
    query: GET_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return {
    props: {
      coachee: data.findCoacheeById,
      content: content.coacheeDetail.data.attributes,
    },
  }
}

export default DetailCoachee

// main tools
import { getSession } from 'next-auth/react'
import { useState } from 'react'

// bootstrap components
import { Col, Container, Row, Spinner } from 'react-bootstrap'

// components
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'
import { CardHistory } from 'components/molecules/CardHistory'
import { Evaluation } from 'components/molecules/Evaluation'
import { StyledEditor } from 'components/atoms/Editor'
import { Layout } from 'components/organisms/Layout'
import { Notes } from 'components/molecules/Notes'

// utils
import { microServices } from 'commons'

// apollo
import GET_COACHEE_EVALUATIONS from 'lib/queries/Coach/Evaluations/getByCoacheeId.gql'
import CREATE_EVALUATION from 'lib/mutations/Coach/Evaluations/create.gql'
import GET_CONTENT from 'lib/strapi/queries/Coachee/detailContent.gql'
import GET_COACHEE_BY_ID from 'lib/queries/Coachee/getById.gql'
import { createApolloClient } from 'lib/apolloClient'
import { initializeApolloClient } from 'lib/apollo'
import { useQuery, useMutation } from '@apollo/client'

// styles
import classes from 'styles/DetailCoachee/detailCoachee.module.scss'

// types
import { EditorTextChangeParams } from 'primereact/editor'
import { GetServerSidePropsContext, NextPage } from 'next'
import { CoacheeDataType } from 'types/models/Coachee'
import { GetSSPropsType } from 'types'

const DetailCoachee: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coachee,
  content,
}) => {
  const [newEvaluation, setNewEvaluation] = useState({ id: NaN, note: '' })

  const {
    data: evaluations,
    loading,
    refetch,
  } = useQuery(GET_COACHEE_EVALUATIONS, {
    context: { ms: microServices.backend },
    variables: { id: coachee?.id },
  })

  const [createEvaluation, { loading: saveLoading }] = useMutation(
    CREATE_EVALUATION,
    {
      context: { ms: microServices.backend },
      onCompleted: () => {
        refetch()
        setNewEvaluation({ id: NaN, note: '' })
      },
    }
  )

  const saveEvaluation = async () => {
    await createEvaluation({
      variables: {
        data: { coacheeId: coachee?.id, evaluation: newEvaluation.note },
      },
    })
  }

  const handleChangeNote = (ev: EditorTextChangeParams) =>
    setNewEvaluation({ ...newEvaluation, note: ev.htmlValue ?? '' })

  return (
    <Layout>
      <Container>
        <Row>
          <CoacheeProfileCard
            coachee={coachee as CoacheeDataType}
            content={content.coacheeCard.data.attributes}
          />
          <Col md={6} className='pt-4'>
            <Container className={`p-5 ${classes.section}`}>
              <StyledEditor
                readOnly={false}
                loading={loading}
                save={saveEvaluation}
                coachNote={newEvaluation}
                onTextChange={handleChangeNote}
              />
            </Container>
            <Container className={`mt-5 ${classes.section}`}>
              {loading ? (
                <Spinner animation='border' />
              ) : (
                <>{console.log('EVALUATIONS', evaluations)}</>
              )}
            </Container>
          </Col>
          <Col md={12} lg={3} className='pt-4'>
            <Container className={`p-4 ${classes.section}`}>
              <Notes coachee={coachee as CoacheeDataType} content={content} />
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
}

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
      coachee: data.findCoacheeById as CoacheeDataType,
      content: content.coacheeDetail.data.attributes,
    },
  }
}

export default DetailCoachee

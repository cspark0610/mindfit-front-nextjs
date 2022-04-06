// main tools
import { getSession } from 'next-auth/react'
import { useState } from 'react'

// bootstrap components
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'

// components
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'
import { CardEvaluation } from 'components/atoms/CardEvaluation'
import { CardHistory } from 'components/molecules/CardHistory'
import { StyledEditor } from 'components/atoms/Editor'
import { Layout } from 'components/organisms/Layout'
import { Notes } from 'components/molecules/Notes'

// utils
import { microServices } from 'commons'
import { userRoles } from 'utils/enums'

// apollo
import GET_COACHEE_EVALUATIONS from 'lib/queries/Coach/Evaluations/getByCoacheeId.gql'
import CREATE_EVALUATION from 'lib/mutations/Coach/Evaluations/create.gql'
import UPDATE_EVALUATION from 'lib/mutations/Coach/Evaluations/update.gql'
import DELETE_EVALUATION from 'lib/mutations/Coach/Evaluations/delete.gql'
import GET_CONTENT from 'lib/strapi/queries/Coachee/detailContent.gql'
import GET_COACHEE_BY_ID from 'lib/queries/Coachee/getById.gql'
import { useQuery, useMutation } from '@apollo/client'
import { createApolloClient } from 'lib/apolloClient'
import { initializeApolloClient } from 'lib/apollo'

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
  const [readOnly, setReadOnly] = useState(false)
  const [evaluationToEdit, setEvaluationToEdit] = useState({
    id: NaN,
    evaluation: '',
  })

  const { data, loading, refetch } = useQuery(GET_COACHEE_EVALUATIONS, {
    context: { ms: microServices.backend },
    variables: { id: coachee?.id },
  })

  const [createEvaluation] = useMutation(CREATE_EVALUATION, {
    context: { ms: microServices.backend },
    onCompleted: () => {
      refetch()
      setEvaluationToEdit({ id: NaN, evaluation: '' })
    },
  })
  const [updateEvaluation] = useMutation(UPDATE_EVALUATION, {
    context: { ms: microServices.backend },
    onCompleted: () => {
      refetch()
      setEvaluationToEdit({ id: NaN, evaluation: '' })
    },
  })
  const [deleteEvaluation] = useMutation(DELETE_EVALUATION, {
    context: { ms: microServices.backend },
    onCompleted: () => {
      setEvaluationToEdit({ id: NaN, evaluation: '' })
      refetch()
    },
  })

  const saveEvaluation = async () => {
    if (evaluationToEdit.id)
      await updateEvaluation({
        variables: {
          coacheeEvaluationId: evaluationToEdit.id,
          data: { evaluation: evaluationToEdit.evaluation },
        },
      })
    else
      await createEvaluation({
        variables: {
          data: {
            coacheeId: coachee?.id,
            evaluation: evaluationToEdit.evaluation,
          },
        },
      })
  }

  const handleEditEvaluation = (evaluation: {
    id: number
    evaluation: string
  }) => {
    setReadOnly(false)
    setEvaluationToEdit(evaluation)
  }

  const handleRemoveEvaluation = async (id: number) => {
    setReadOnly(false)
    await deleteEvaluation({ variables: { coacheeEvaluationId: id } })
  }

  const handleCloseEvaluation = () => {
    setReadOnly(false)
    setEvaluationToEdit({ id: NaN, evaluation: '' })
  }

  const handleChangeNote = (ev: EditorTextChangeParams) =>
    setEvaluationToEdit({ ...evaluationToEdit, evaluation: ev.htmlValue ?? '' })

  return (
    <Layout>
      <Container>
        <Row>
          <CoacheeProfileCard coachee={coachee as CoacheeDataType} />
          <Col md={6} className='pt-4'>
            <Container className={`p-0 ${classes.section_small}`}>
              <StyledEditor
                readOnly={readOnly}
                loading={loading}
                save={saveEvaluation}
                coachNote={evaluationToEdit}
                onTextChange={handleChangeNote}
                removed={handleRemoveEvaluation}
              />
              {readOnly && (
                <Row xs='auto' className='m-3 justify-content-end'>
                  <Col>
                    <Button onClick={() => setReadOnly(false)}>Editar</Button>
                  </Col>
                  <Col>
                    <Button
                      variant='secondary'
                      className={classes.button_secondary}
                      onClick={handleCloseEvaluation}>
                      Cerrar
                    </Button>
                  </Col>
                </Row>
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
          <h3 className={classes.title}>Evaluaciones Realizadas</h3>
          <Container className='my-4'>
            {loading ? (
              <Spinner animation='border' />
            ) : (
              <Row className={classes.evaluations}>
                {data.findCoacheeById.coacheeEvaluations.map(
                  (evaluation: { id: number; evaluation: string }) => (
                    <Col key={evaluation.id} xs={12} sm={6} lg={3}>
                      <CardEvaluation
                        readOnly={() => setReadOnly(true)}
                        evaluation={evaluation}
                        edit={handleEditEvaluation}
                        removed={handleRemoveEvaluation}
                      />
                    </Col>
                  )
                )}
              </Row>
            )}
          </Container>
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
  if (!session || session.user.role !== userRoles.COACH)
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

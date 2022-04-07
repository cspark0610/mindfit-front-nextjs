// bootstrap components
import { Row, Spinner } from 'react-bootstrap'

// commons
import { microServices, sortingAscending } from 'commons'

// gql
import GET_COACHEE_EVALUATION from 'lib/queries/Coachee/getCoacheeEvaluation.gql'

// styles
import classes from 'styles/Evaluation/evaluation.module.scss'

// types
import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import { CoacheeDataType } from 'types/models/Coachee'

export const Evaluation: FC<{ content: any; coachee: CoacheeDataType }> = ({
  coachee,
  content,
}) => {
  const [evaluation, setEvaluation] = useState('')

  const { loading } = useQuery(GET_COACHEE_EVALUATION, {
    variables: { id: coachee.id },
    context: { ms: microServices.backend },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const ev = [...data.findCoacheeById.coacheeEvaluations]
      ev.sort((prev: any, next: any) =>
        sortingAscending(next, prev, 'createdAt')
      )
      setEvaluation(
        ev.length ? ev[0].evaluation : 'No hay ninguna evaluación realizada'
      )
    },
  })

  return (
    <Row className='mb-4'>
      <h4 className={`mb-4 fw-bold ${classes.title}`}>
        {content.evaluationTitle}
      </h4>
      {!loading ? (
        <div dangerouslySetInnerHTML={{ __html: evaluation }} />
      ) : (
        <Spinner animation='border' />
      )}
    </Row>
  )
}

// bootstrap components
import { Container, Row, Spinner } from 'react-bootstrap'

// prime components
import { Rating } from 'primereact/rating'

// commons
import { microServices } from 'commons'

// gql
import { useQuery } from '@apollo/client'
import FIND_FEEDBACK from 'lib/queries/Feedback/findFeedbackById.gql'

//styles
import classes from 'styles/Rating/rating.module.scss'

//types
import { FC } from 'react'
import { RatingChangeParams } from 'primereact/rating'
import { FeedbackProps } from 'types/components/feedback'

export const Ratings: FC<{
  feedbackId: number
  feedback: FeedbackProps[]
  setFeedback: ([]) => void
}> = ({ feedbackId, feedback, setFeedback }) => {
  const handleChange = (ev: RatingChangeParams) => {
    const newFeedback = feedback.map((item) => {
      if (item.codename === ev.target.id) item.value = ev.target.value ?? 1
      return item
    })
    setFeedback(newFeedback)
  }

  const { loading } = useQuery(FIND_FEEDBACK, {
    variables: { id: feedbackId },
    context: { ms: microServices.backend },
    onCompleted: (data) => {
      const value = data.findFeedbackById.questions.map(
        ({ codename, defaultText }: FeedbackProps) => ({
          codename,
          defaultText,
          value: 1,
        })
      )
      setFeedback(value)
    },
  })

  return (
    <Container className={classes.section}>
      <h5>Feedback de la sesion</h5>
      {!loading ? (
        feedback.map((item) => (
          <Row md={2} key={item.codename} className={classes.stars}>
            <Rating
              cancel={false}
              id={item.codename}
              value={item.value}
              onChange={handleChange}
            />
            <p>{item.defaultText}</p>
          </Row>
        ))
      ) : (
        <Spinner animation='border' color='primary' />
      )}
    </Container>
  )
}

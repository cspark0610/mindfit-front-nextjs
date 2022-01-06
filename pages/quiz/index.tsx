// main tools
import { useState, Fragment } from 'react'
import { getSession } from 'next-auth/react'

// components
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// bootstrap components
import { Container, Carousel, Row, Col, Button } from 'react-bootstrap'

// prime components
import { RadioButton, RadioButtonChangeParams } from 'primereact/radiobutton'

// utils
import { verifyTestQuestions } from 'utils/verifyTestQuestions'

// styles
import classes from 'styles/Quiz/page.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const QuizPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
  const [actualQuestion, setActualQuestion] = useState(0)
  const [answers, setAnswers] = useState<
    { [key: string]: { value: number } }[]
  >([])

  const handleChangeQuestion = (index: number) => setActualQuestion(index)

  const handleChangeAnswer = (e: RadioButtonChangeParams, idx: number) => {
    setAnswers((prev) => {
      const updateAnswers = prev.length > 0 ? [...prev] : []
      updateAnswers[idx] = {
        ...updateAnswers[idx],
        [e.target.name]: { value: e.value },
      }

      return updateAnswers
    })
  }

  const handleNextQuestion = () => {
    actualQuestion < (content?.test.length as number) - 1
      ? setActualQuestion((prev) => prev + 1)
      : console.log(answers)
  }
  const handlePrevQuestion = () =>
    actualQuestion > 0 && setActualQuestion((prev) => prev - 1)

  return (
    <Layout>
      <Container className={classes.container}>
        <Container className={classes.section}>
          <h1 className={classes.title}>Prueba de auto - diagnóstico</h1>
          {console.log(answers)}
          <Carousel
            indicators={false}
            controls={false}
            interval={null}
            activeIndex={actualQuestion}
            onSelect={handleChangeQuestion}>
            {content?.test.map((page, idx) => (
              <Carousel.Item key={idx}>
                <p className='my-4'>{page.description}</p>
                {page.questions.map((question, index) => (
                  <Fragment key={`${idx}-${index}`}>
                    <p className={classes.question}>
                      {index + 1} - {question.title}
                    </p>
                    <Row>
                      {question.options.map((option, optionIdx) => {
                        const formattedKey = question?.title.replace(/ /g, '_')
                        return (
                          <Col
                            className={classes.question_option}
                            key={`${idx}-${index}-${optionIdx}`}
                            xs={6}
                            md={3}>
                            <RadioButton
                              inputId={`${formattedKey}-${optionIdx}`}
                              name={formattedKey}
                              value={option.value}
                              onChange={(ev) => handleChangeAnswer(ev, idx)}
                              checked={
                                answers[idx] &&
                                answers[idx][formattedKey]?.value ===
                                  option.value
                              }
                            />{' '}
                            <div className={classes.question_option_label}>
                              <label htmlFor={`${formattedKey}-${optionIdx}`}>
                                {option.label}
                              </label>
                            </div>
                          </Col>
                        )
                      })}
                    </Row>
                  </Fragment>
                ))}
              </Carousel.Item>
            ))}
          </Carousel>
          <Row className={classes.row}>
            <Col xs={12} md={6}>
              <Button
                disabled={actualQuestion === 0}
                onClick={handlePrevQuestion}
                className={classes.button}>
                Pregunta anterior
              </Button>
            </Col>
            <Col xs={12} md={6}>
              <Button
                disabled={
                  !verifyTestQuestions(actualQuestion, content?.test, answers)
                }
                onClick={handleNextQuestion}
                className={classes.button}>
                {actualQuestion < (content?.test.length as number) - 1
                  ? `Siguiente pregunta ${actualQuestion + 1} - ${
                      content?.test.length
                    }`
                  : 'Terminar test'}
              </Button>
            </Col>
          </Row>
          <ExploreBadge />
        </Container>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/login', permanent: false }, props: {} }

  const content = await import('@public/jsons/quiz/test.json')

  return { props: { content: content.default } }
}

export default QuizPage

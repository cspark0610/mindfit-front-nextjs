// main tools
import { useState, useEffect, Fragment, useRef } from 'react'
import { getSession } from 'next-auth/react'
import { useQuery, useMutation } from '@apollo/client'

// gql
import GET_MAIN_QUIZ from 'lib/queries/Quiz/getMainQuiz.gql'
import GET_QUIZ_CONTENT from 'lib/queries/Quiz/getQuizById.gql'
import SUBMIT_QUIZ from 'lib/mutations/Quiz/submitQuiz.gql'

// components
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// bootstrap components
import { Container, Carousel, Row, Col, Button } from 'react-bootstrap'

// prime components
import { RadioButton } from 'primereact/radiobutton'
import { Checkbox } from 'primereact/checkbox'

// utils
import { verifyTestQuestions } from 'utils/verifyTestQuestions'

// styles
import classes from 'styles/Quiz/page.module.scss'

// types
import { RadioButtonChangeParams } from 'primereact/radiobutton'
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'
import { microServices } from 'commons'
import { createApolloClient } from 'lib/apolloClient'
import { QuizSkeleton } from 'components/organisms/Quiz/Skeleton'

const QuizPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  quizId,
}) => {
  const [quiz, setQuiz] = useState<any>(undefined)
  const [actualSection, setActualSection] = useState(0)
  const [answers, setAnswers] = useState<any>({})
  const backToTop = useRef<HTMLHeadingElement>(null)

  const { data, loading } = useQuery(GET_QUIZ_CONTENT, {
    context: { ms: microServices.backend },
    variables: { id: quizId },
  })

  const [SubmitQuiz] = useMutation(SUBMIT_QUIZ, {
    context: { ms: microServices.backend },
    onCompleted: (res) => console.log(res),
  })

  const handleChangeSection = (index: number) => setActualSection(index)
  const handleNextQuestion = () => {
    actualSection < (quiz?.sections.length as number) - 1
      ? setActualSection((prev) => prev + 1)
      : SubmitQuiz({ variables: { data: { ...answers } } })
  }
  const handlePrevQuestion = () =>
    actualSection > 0 && setActualSection((prev) => prev - 1)

  const handleVerifyCheck = (
    sectionId: number,
    questionId: number,
    answerId: number
  ) => {
    const findSection = answers.sectionsResult.find(
      ({ section }: { section: number }) => section === sectionId
    )

    if (findSection) {
      const question = findSection.questions.find(
        ({ question }: { question: number }) => question === questionId
      )
      if (question) return question.answersSelected.includes(answerId)
      else return false
    } else return false
  }

  const handleChangeAnswer = (
    ev: RadioButtonChangeParams,
    sectionId: number,
    questionId: number,
    type: string
  ) => {
    setAnswers((prev: any) => {
      const sectionToUpdate = prev.sectionsResult.find(
        ({ section }: any) => section === sectionId
      )

      if (sectionToUpdate) {
        const questionToUpdate = sectionToUpdate.questions.find(
          ({ question }: any) => question === questionId
        )
        if (questionToUpdate) {
          if (type === 'MULTISELECT') {
            const answer = questionToUpdate.answersSelected.find(
              (answerId: number) => answerId === ev.value.id
            )
            if (answer) {
              questionToUpdate.answersSelected =
                questionToUpdate.answersSelected.filter(
                  (answerId: number) => answerId !== answer
                )
            } else questionToUpdate.answersSelected.push(ev.value.id)
          } else {
            questionToUpdate.answersSelected = [ev.value.id]
          }
        } else {
          sectionToUpdate.questions.push({
            question: questionId,
            answersSelected: [ev.value.id],
          })
        }
      } else
        return {
          ...prev,
          sectionsResult: [
            ...prev.sectionsResult,
            {
              section: sectionId,
              questions: [
                { question: questionId, answersSelected: [ev.value.id] },
              ],
            },
          ],
        }

      return {
        ...prev,
        sectionsResult: [
          ...prev.sectionsResult.filter(
            (item: any) => item.section !== sectionId
          ),
          sectionToUpdate,
        ],
      }
    })
  }

  useEffect(() => {
    if (data) {
      setQuiz(data.findSatBasicById)
      setAnswers({
        satRealizedId: data.findSatBasicById.id,
        sectionsResult: [],
      })
    }
  }, [data])

  useEffect(
    () => backToTop.current?.scrollIntoView({ block: 'center' }),
    [actualSection]
  )

  return (
    <Layout>
      <Container className={classes.container}>
        <Container className={classes.section}>
          {loading ? (
            <QuizSkeleton />
          ) : (
            <>
              <h1 ref={backToTop} className={classes.title}>
                {quiz?.title}
              </h1>
              <Carousel
                indicators={false}
                controls={false}
                interval={null}
                activeIndex={actualSection}
                onSelect={handleChangeSection}>
                {quiz?.sections.map((section: any) => (
                  <Carousel.Item key={section.id}>
                    <h2 className={classes.subtitle}>{section.title}</h2>
                    {section.questions.map((question: any, idx: number) => (
                      <Fragment key={`${section.id}-${question.id}`}>
                        <p className={classes.question}>
                          {idx + 1} - {question.title}
                        </p>
                        <Row>
                          {question.answers.map((answer: any) => (
                            <Col
                              className={classes.question_option}
                              key={`${section.id}-${question.id}-${answer.id}`}
                              xs={6}
                              md={3}>
                              {question.type === 'SELECT' && (
                                <RadioButton
                                  inputId={`${section.id}-${question.id}-${answer.id}`}
                                  value={answer}
                                  onChange={(ev) =>
                                    handleChangeAnswer(
                                      ev,
                                      section.id,
                                      question.id,
                                      question.type
                                    )
                                  }
                                  checked={handleVerifyCheck(
                                    section.id,
                                    question.id,
                                    answer.id
                                  )}
                                />
                              )}
                              {question.type === 'MULTISELECT' && (
                                <Checkbox
                                  inputId={`${section.id}-${question.id}-${answer.id}`}
                                  value={answer}
                                  onChange={(ev) =>
                                    handleChangeAnswer(
                                      ev,
                                      section.id,
                                      question.id,
                                      question.type
                                    )
                                  }
                                  checked={handleVerifyCheck(
                                    section.id,
                                    question.id,
                                    answer.id
                                  )}
                                />
                              )}{' '}
                              <div className={classes.question_option_label}>
                                <label
                                  htmlFor={`${section.id}-${question.id}-${answer.id}`}>
                                  {answer.title}
                                </label>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </Fragment>
                    ))}
                  </Carousel.Item>
                ))}
              </Carousel>
              <Row className={classes.row}>
                <Col xs={12} md={6}>
                  <Button
                    disabled={actualSection === 0}
                    onClick={handlePrevQuestion}
                    className={classes.button}>
                    Pregunta anterior
                  </Button>
                </Col>
                <Col xs={12} md={6}>
                  <Button
                    disabled={
                      !verifyTestQuestions(
                        actualSection,
                        quiz?.sections[actualSection],
                        answers
                      )
                    }
                    onClick={handleNextQuestion}
                    className={classes.button}>
                    {actualSection < (quiz?.sections.length as number) - 1
                      ? `Siguiente pregunta ${actualSection + 1} - ${
                          quiz?.sections.length
                        }`
                      : 'Terminar test'}
                  </Button>
                </Col>
              </Row>
            </>
          )}
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

  const apolloClient = createApolloClient(session.token)

  const { data } = await apolloClient.query({
    query: GET_MAIN_QUIZ,
    context: { ms: microServices.backend },
  })

  return { props: { quizId: parseInt(data?.getDefaultSat?.value) } }
}

export default QuizPage

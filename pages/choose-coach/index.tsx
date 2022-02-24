// main tools
import { useState } from 'react'
import Image from 'next/image'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'

// gql
import { useQuery, useMutation } from '@apollo/client'
import { initializeApolloClient } from 'lib/apollo'
import { createApolloClient } from 'lib/apolloClient'
import GET_COACHEE_BY_ID from 'lib/queries/Coachee/getById.gql'
import GET_SUGGESTED_COACHES from 'lib/queries/Coachee/getSuggestedCoaches.gql'
import REJECT_SUGGESTED_COACHES from 'lib/mutations/Coachees/rejectSuggestedCoaches.gql'
import GET_COACH_SELECTION_CONTENT from 'lib/queries/Strapi/CoachSelectionContent/getCoachSelectionContent.gql'

// Commons
import { microServices } from 'commons'
import { coacheeRegistrationStatus } from 'utils/enums'

//components
import { CoachCard } from 'components/molecules/CoachCard'
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { CoachSearchFeedback } from 'components/molecules/CoachSearchFeedback'
import { ChooseCoachSkeleton } from 'components/molecules/Skeletons/ChooseCoachSkeleton'

//styles
import classes from 'styles/ChooseCoach/chooseCoach.module.scss'

//types
import { NextPage, GetServerSidePropsContext } from 'next'
import { CoachDataType } from 'types/models/Coach'
import { GetSSPropsType } from 'types'

import { Carousel } from 'primereact/carousel'
import { getSession } from 'next-auth/react'
import { CoacheeDataType } from 'types/models/Coachee'

const SelectCoach: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
  //States
  const [coaches, setCoaches] = useState<CoachDataType[]>([])
  const [suggestedCoachesId, setSuggestedCoachesId] = useState<number>(NaN)
  const [showedCoachs, setShowedCoachs] = useState(2)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [showMaxSuggestions, setShowMaxSuggestions] = useState(false)
  const responsiveOptions = [
    { breakpoint: '1200px', numVisible: 2, numScroll: 2 },
    { breakpoint: '850px', numVisible: 1, numScroll: 1 },
  ]

  const { loading, refetch } = useQuery(GET_SUGGESTED_COACHES, {
    context: { ms: microServices.backend },
    onCompleted: (data) => {
      setCoaches(data.getRandomSuggestedCoaches.coaches)
      setSuggestedCoachesId(data.getRandomSuggestedCoaches.id)
    },
    onError: () => setShowMaxSuggestions(true),
  })

  const [RejectSuggestedCoaches] = useMutation(REJECT_SUGGESTED_COACHES, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })

  //form state handlers
  const handleOpenFeedBackForm = () => setShowFeedbackForm(true)
  const handleCloseFeedBackForm = () => setShowFeedbackForm(false)

  const handleSubmit = (rejectionReason: string) => {
    if (showedCoachs < 8) {
      // reject coaches
      RejectSuggestedCoaches({
        variables: { data: { rejectionReason, suggestedCoachesId } },
      })
      setShowedCoachs(showedCoachs + 3)
      handleCloseFeedBackForm()
    }
  }

  const coachsTemplate = (coach: CoachDataType) => (
    <CoachCard
      data={coach}
      content={content}
      suggestedCoachId={suggestedCoachesId}
    />
  )

  return (
    <Layout>
      <Container className={classes.container}>
        {showMaxSuggestions ? (
          <Row className='justify-content-center'>
            <Col className='text-center' sm={6}>
              <Image
                width={420}
                height={250}
                layout='intrinsic'
                alt='Mindfit Logo'
                src='/assets/icon/MINDFIT.svg'
              />
              <h1>Contacte a soporte</h1>
            </Col>
          </Row>
        ) : showFeedbackForm ? (
          <Row className='justify-content-center'>
            <Col md={9}>
              <CoachSearchFeedback
                content={content}
                submit={handleSubmit}
                cancel={handleCloseFeedBackForm}
              />
            </Col>
          </Row>
        ) : loading ? (
          <ChooseCoachSkeleton />
        ) : (
          <>
            <h1 className={classes.title}>{content.title}</h1>
            <Row className='justify-content-center'>
              <Col xs={12}>
                <Carousel
                  numScroll={1}
                  numVisible={3}
                  value={coaches}
                  itemTemplate={coachsTemplate}
                  responsiveOptions={responsiveOptions}
                  indicatorsContentClassName={classes.carousel_point}
                />
              </Col>
            </Row>
            <Row>
              {showedCoachs < 8 && (
                <Button
                  variant='link'
                  className={classes.sugestBtn}
                  onClick={handleOpenFeedBackForm}>
                  {content.otherCoachs}
                </Button>
              )}
            </Row>
            <ExploreBadge />
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }
  else if (!session.user.coachee || session.user.organization)
    return {
      redirect: { destination: '/coachees/add', permanent: false },
      props: {},
    }

  const apollo = createApolloClient(session.token)
  const { data: coachee } = await apollo.query<{
    findCoacheeById: CoacheeDataType
  }>({
    query: GET_COACHEE_BY_ID,
    variables: { id: session.user.coachee?.id },
    context: { ms: microServices.backend },
  })

  if (
    coachee.findCoacheeById.registrationStatus !==
    coacheeRegistrationStatus.COACH_SELECTION_PENDING
  )
    return {
      redirect: { destination: '/signup/coachee/steps', permanent: false },
      props: {},
    }

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    variables: { locale: ctx.locale },
    query: GET_COACH_SELECTION_CONTENT,
    context: { ms: microServices.strapi },
  })

  return { props: { content: data.coachSelection.data.attributes } }
}

export default SelectCoach

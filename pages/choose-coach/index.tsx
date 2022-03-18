// main tools
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'

// prime components
import { Carousel } from 'primereact/carousel'

// animated components
import { RowMotion } from 'components/atoms/AnimateComponents'
import { viewportFadeIn } from 'commons/animations'

// gql
import { initializeApolloClient } from 'lib/apollo'
import { createApolloClient } from 'lib/apolloClient'
import { useQuery, useMutation } from '@apollo/client'
import GET_COACHEE_PROFILE from 'lib/queries/Coachee/getCoacheeProfile.gql'
import GET_SUGGESTED_COACHES from 'lib/queries/Coachee/getSuggestedCoaches.gql'
import REJECT_SUGGESTED_COACHES from 'lib/mutations/Coachee/rejectSuggestedCoaches.gql'
import GET_COACH_SELECTION_CONTENT from 'lib/queries/Strapi/CoachSelectionContent/getCoachSelectionContent.gql'

// Commons
import { microServices } from 'commons'
import { coacheeRegistrationStatus } from 'utils/enums'

//components
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { ChooseCoachCard } from 'components/organisms/ChooseCoach/ChooseCoachCard'
import { ChooseCoachSkeleton } from 'components/organisms/ChooseCoach/ChooseCoachSkeleton'
import { CoachSearchFeedback } from 'components/organisms/ChooseCoach/CoachSearchFeedback'

//styles
import classes from 'styles/ChooseCoach/page.module.scss'

//types
import { GetSSPropsType } from 'types'
import { CoachDataType } from 'types/models/Coach'
import { CoacheeDataType } from 'types/models/Coachee'
import { NextPage, GetServerSidePropsContext } from 'next'

const SelectCoach: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
  //States
  const [showedCoachs, setShowedCoachs] = useState(2)
  const [coaches, setCoaches] = useState<CoachDataType[]>([])
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [showMaxSuggestions, setShowMaxSuggestions] = useState(false)
  const [suggestedCoachesId, setSuggestedCoachesId] = useState<number>(NaN)
  const responsiveOptions = [
    { breakpoint: '1200px', numVisible: 2, numScroll: 2 },
    { breakpoint: '850px', numVisible: 1, numScroll: 1 },
  ]

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

  const { loading, refetch } = useQuery(GET_SUGGESTED_COACHES, {
    context: { ms: microServices.backend },
    onCompleted: (data) => {
      setCoaches(data.getRandomSuggestedCoaches.coaches)
      setSuggestedCoachesId(data.getRandomSuggestedCoaches.id)
    },
    onError: () => setShowMaxSuggestions(true),
  })

  const [RejectSuggestedCoaches] = useMutation(REJECT_SUGGESTED_COACHES, {
    onCompleted: () => refetch(),
    context: { ms: microServices.backend },
  })

  const coachesTemplate = (coach: CoachDataType) => (
    <ChooseCoachCard
      data={coach}
      content={content}
      suggestedCoachId={suggestedCoachesId}
    />
  )

  return (
    <Layout>
      <Container className={classes.section}>
        {showMaxSuggestions ? (
          <RowMotion {...viewportFadeIn} className='justify-content-center'>
            <Image
              width={420}
              height={250}
              alt='Mindfit Logo'
              layout='intrinsic'
              src='/assets/icon/MINDFIT.svg'
            />
            <h1 className={classes.title}>Contacte a soporte</h1>
          </RowMotion>
        ) : showFeedbackForm ? (
          <RowMotion {...viewportFadeIn} className='justify-content-center'>
            <Col md={9}>
              <CoachSearchFeedback
                content={content}
                submit={handleSubmit}
                cancel={handleCloseFeedBackForm}
              />
            </Col>
          </RowMotion>
        ) : loading ? (
          <ChooseCoachSkeleton />
        ) : (
          <>
            <h1 className={classes.title}>{content.title}</h1>
            <RowMotion {...viewportFadeIn} className='justify-content-center'>
              <Col xs={12}>
                <Carousel
                  numScroll={1}
                  numVisible={3}
                  value={coaches}
                  itemTemplate={coachesTemplate}
                  responsiveOptions={responsiveOptions}
                  indicatorsContentClassName={classes.points}
                />
              </Col>
            </RowMotion>
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
    getCoacheeProfile: CoacheeDataType
  }>({
    query: GET_COACHEE_PROFILE,
    context: { ms: microServices.backend },
  })

  if (
    coachee.getCoacheeProfile.registrationStatus !==
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

// Main Tools
import { getSession } from 'next-auth/react'

// Utils
import { microServices } from 'commons'
import { formatSatResultsTemplates } from 'utils/formatTestTemplates'

// Component
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { SAT_TEMPLATES } from 'components/molecules/SatResults'

// Apollo
import { initializeApolloClient } from 'lib/apollo'
import { createApolloClient } from 'lib/apolloClient'
import GET_RESULT_BY_ID from 'lib/queries/Quiz/getResultsById.gql'
import GET_SAT_REPORT_CONTENT from 'lib/queries/Strapi/SatReport/satReport.gql'

// Boostrap Component
import { Container, Carousel } from 'react-bootstrap'

// Styles
import classes from 'styles/SatTemplates/satTemplates.module.scss'

// Type
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const QuizReport: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  satResults,
  content,
}) => {
  const templates = formatSatResultsTemplates(content, satResults.result)
  const slides: any = [
    { ...content.satReportIntro.data, template: 'satReportIntro' },
    { ...content.satReportGreeting.data, template: 'satReportGreeting' },
    ...templates,
    { ...content.satReportFarewell.data, template: 'satReportFarewell' },
  ]

  return (
    <Layout>
      <Container className={classes.container}>
        <Carousel
          wrap={false}
          variant='dark'
          interval={null}
          className={classes.carousel}>
          {slides.map((slide: any, idx: number) => (
            <Carousel.Item className={classes.cardContainer} key={idx}>
              {SAT_TEMPLATES[slide.template as keyof typeof SAT_TEMPLATES]({
                ...slide.attributes,
                result: slide.result,
              })}
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <ExploreBadge />
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }

  /**
   * agregar validaciones para que, en caso de que este id
   * no corresponda a los resultados de una prueba hecha
   * por el usuario que esta en session, sea redireccionado
   * al dashboard de dicho usuario
   */

  const id = parseInt(ctx.params?.id as string)
  const apolloClient = createApolloClient(session.token)
  const apolloClientForStrapi = initializeApolloClient()

  try {
    const { data } = await apolloClient.query({
      query: GET_RESULT_BY_ID,
      variables: { id },
      context: { ms: microServices.backend },
    })
    const { data: content } = await apolloClientForStrapi.query({
      query: GET_SAT_REPORT_CONTENT,
      variables: { locale: ctx.locale },
      context: { ms: microServices.strapi },
    })

    return {
      props: {
        satResults: data.findSatReportById,
        content: content.satReport.data.attributes,
      },
    }
  } catch (error) {
    return { redirect: { destination: '/quiz', permanent: false }, props: {} }
  }
}

export default QuizReport

// Main Tools
import { getSession } from 'next-auth/react'

// Utils
import { microServices } from 'commons'

// Component
import { SAT_TEMPLATES } from 'components/molecules/SatResults'
import { Layout } from 'components/organisms/Layout'
import { Container } from 'react-bootstrap'
import { initializeApolloClient } from 'lib/apollo'

// Apollo
import GET_RESULT_BY_ID from 'lib/queries/Quiz/getResultsById.gql'
import GET_SAT_REPORT_CONTENT from 'lib/queries/Strapi/SatReport/satReport.gql'
import { createApolloClient } from 'lib/apolloClient'

// Boostrap Component
import Carousel from 'react-bootstrap/Carousel'

// Styles
import classes from 'styles/SatTemplates/satTemplates.module.scss'

// Type
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const QuizReport: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  satResults,
  content,
}) => {
  console.log('content', content)
  const slides = [
    {
      ...content?.find((item: any) => item.template === 'satReportIntro'),
    },
    {
      ...content?.find((item: any) => item.template === 'satReportGreeting'),
    },
    // ...satResults.result.map((item: any) => {
    //   console.log(item)
    //   return {}
    // }),
    {
      ...content?.find((item: any) => item.template === 'satReportFarewell'),
    },
  ]

  console.log('soy sliders', slides)
  return (
    <Layout>
      <Container fluid className={classes.container}>
        <Carousel className={classes.carouselShadow}>
          {slides.map((slide: any) => (
            <Carousel.Item
              className={classes.cardContainer}
              key={slide.template}>
              {console.log('sOYE EL TEMPLATE', slide.template)}
              {SAT_TEMPLATES[
                slide.attributes.__typename as keyof typeof SAT_TEMPLATES
              ]({ ...slide.attributes, satResults })}
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/login', permanent: false }, props: {} }

  const id = parseInt(ctx.params?.id as string)
  const apolloClient = createApolloClient(session.token)
  const apolloClientForStrapi = initializeApolloClient()

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

  const { attributes } = content.satReport.data

  const [_, ...templates]: any = Object.entries(attributes).map(
    ([key, value]: any) => ({ ...value.data, template: key })
  )

  console.log(templates)

  return { props: { satResults: data.findSatReportById, content: templates } }
}

export default QuizReport

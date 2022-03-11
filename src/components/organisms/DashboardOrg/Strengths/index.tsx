// main tools
import { useState } from 'react'

// boostrap components
import { Col, Row } from 'react-bootstrap'

// commons
import { microServices } from 'commons'

// gql
import { useQuery } from '@apollo/client'
import DEVELOPMENT_AREAS from 'lib/queries/Organization/OrgDashboard/developmentAreas.gql'

// styles
import classes from 'styles/DashboardOrg/strengths.module.scss'

// types
import { FC } from 'react'

export const Strengths: FC<{ content: any }> = ({ content }) => {
  const [strengths, setStrengths] = useState([])
  const [weaknesses, setWeaknesses] = useState([])

  const { loading } = useQuery(DEVELOPMENT_AREAS, {
    context: { ms: microServices.backend },
    onCompleted: (data) => {
      setStrengths(data.getOrganizationDevelopmentAreas.strengths)
      setWeaknesses(data.getOrganizationDevelopmentAreas.weaknesses)
    },
  })

  const myStrengths = strengths.map((item) =>
    content.developmentAreas.find((area: any) => area.developmentAreas === item)
  )
  const myWeaknesses = weaknesses.map((item) =>
    content.developmentAreas.find((area: any) => area.developmentAreas === item)
  )

  return (
    <section className={classes.section}>
      <h3 className={`text-center mb-5 ${classes.title}`}>{content.title}</h3>
      <h4 className={`mb-3 ${classes.title}`}>{content.subtitle}</h4>
      <p>{content.description}</p>
      {!loading && (
        <Row className='justify-content-center'>
          <Col sm={12} lg={10} className={`mt-5 ${classes.section_small}`}>
            <h5 className={`mb-4 fw-bold ${classes.title}`}>
              {content.titleStrengths}
            </h5>
            <Row>
              {myStrengths.map((item, idx: number) => (
                <Col key={idx} className='text-center'>
                  <i
                    style={{ backgroundColor: item.color }}
                    className={`pi pi-${item.icon}  mb-3 ${classes.icon}`}
                  />
                  <p>{item.label}</p>
                </Col>
              ))}
            </Row>
          </Col>
          <Col sm={12} lg={10} className={`mt-5 ${classes.section_small}`}>
            <h5 className={`mb-4 fw-bold ${classes.title}`}>
              {content.titleWeaknesses}
            </h5>
            <Row>
              {myWeaknesses.map((item) => (
                <Col key={item.label} className='text-center'>
                  <i
                    style={{ backgroundColor: item.color }}
                    className={`pi pi-${item.icon}  mb-3 ${classes.icon}`}
                  />
                  <p>{item.label}</p>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </section>
  )
}

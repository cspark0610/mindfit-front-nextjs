// bootsrap components
import { Col, ProgressBar, Row, Spinner } from 'react-bootstrap'

// prime components
import { Knob } from 'primereact/knob'

// gql
import SATISFACTION from 'lib/queries/Organization/OrgDashboard/satisfaction.gql'

// styles
import classes from 'styles/DashboardOrg/satisfaction.module.scss'

// types
import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import { microServices } from 'commons'

export const Satisfaction: FC<{ content: any }> = ({ content }) => {
  const [sessionsSatisfaction, setSessionsSatisfaction] = useState([
    { questionCodename: '', value: NaN },
  ])

  const { loading, data } = useQuery(SATISFACTION, {
    context: { ms: microServices.backend },
    onCompleted: (data) => {
      setSessionsSatisfaction(
        data.getOrganizationCoacheesSatisfaction.sessionsSatisfaction
      )
    },
  })

  return (
    <section className={`mb-5 ${classes.section}`}>
      {loading ? (
        <Spinner animation='border' />
      ) : !data.averageSatisfaction ? (
        <p>No existen suficientes datos para mostrar esta gráfica</p>
      ) : (
        <>
          <h3 className={`mb-5 text-center ${classes.blue}`}>
            {content.title}
          </h3>
          <Knob
            max={10}
            value={5.9}
            readOnly
            textColor='#1a7bee'
            valueColor='#045095'
            valueTemplate={'{value}/10'}
            className={classes.knob}
            strokeWidth={8}
          />
          <Col xs={6} className='m-auto text-center'>
            <p className={`fw-bold ${classes.gray}`}>
              {content.Description} {data.averageSatisfaction}
            </p>
          </Col>
          <Row xs='auto' className='justify-content-center align-items-end'>
            {sessionsSatisfaction.map((item) => (
              <>
                <Col xs={8} className='mt-4'>
                  <p className={classes.gray}>{item.questionCodename}</p>
                  <ProgressBar className={classes.progressBar}>
                    <ProgressBar
                      max={6}
                      now={item.value}
                      className={classes.bar}
                      style={{ backgroundColor: '#1a7bee' }}
                    />
                  </ProgressBar>
                </Col>
                <Col>
                  <h3 className={`fw-bold ${classes.blue}`}>{item.value}</h3>
                </Col>
              </>
            ))}
          </Row>
        </>
      )}
    </section>
  )
}

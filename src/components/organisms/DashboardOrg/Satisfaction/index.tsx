// bootsrap components
import { Col, ProgressBar, Row } from 'react-bootstrap'

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
  const [data, setData] = useState()

  const { loading } = useQuery(SATISFACTION, {
    context: { ms: microServices.backend },
    onCompleted: (data) => {
      setData(data.getOrganizationCoacheesSatisfaction)
    },
  })

  return (
    <section className={`mb-5 ${classes.section}`}>
      <h3 className={`mb-5 text-center ${classes.blue}`}>{content.title}</h3>
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
        <p className={`fw-bold ${classes.gray}`}>{content.description}</p>
      </Col>
      <Row xs='auto' className='justify-content-center align-items-end'>
        <Col xs={8} className='mt-4'>
          <p className={classes.gray}>
            Mi entrenador y yo nos respetamos mutuamente
          </p>
          <ProgressBar className={classes.progressBar}>
            <ProgressBar
              max={6}
              now={4.6}
              className={classes.bar}
              style={{ backgroundColor: '#1a7bee' }}
            />
          </ProgressBar>
        </Col>
        <Col>
          <h3 className={`fw-bold ${classes.blue}`}>4.6</h3>
        </Col>
        <Col xs={8} className='mt-4'>
          <p className={classes.gray}>
            Estamos de acuerdo en lo que es importante que trabaje
          </p>
          <ProgressBar className={classes.progressBar}>
            <ProgressBar
              max={6}
              now={5.2}
              className={classes.bar}
              style={{ backgroundColor: '#fe5000' }}
            />
          </ProgressBar>
        </Col>
        <Col>
          <h3 className={`fw-bold ${classes.blue}`}>5.2</h3>
        </Col>
        <Col xs={8} className='mt-4'>
          <p className={classes.gray}>
            Siento que las cosas que hago en el coaching me ayudaran a lograr
            los cambios que quiero
          </p>
          <ProgressBar className={classes.progressBar}>
            <ProgressBar
              max={6}
              now={3.5}
              className={classes.bar}
              style={{ backgroundColor: '#2fb684' }}
            />
          </ProgressBar>
        </Col>
        <Col>
          <h3 className={`fw-bold ${classes.blue}`}>3.5</h3>
        </Col>
      </Row>
    </section>
  )
}

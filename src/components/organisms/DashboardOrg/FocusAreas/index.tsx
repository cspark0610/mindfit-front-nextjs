// bootsrap components
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'

// commons
import { microServices } from 'commons'

// components
import { ChartDoughnut } from 'components/atoms/ChartDoughnut'

// gql
import { useQuery } from '@apollo/client'
import FOCUS_AREAS from 'lib/queries/Organization/OrgDashboard/focusAreas.gql'

// styles
import classes from 'styles/DashBoardOrg/focusAreas.module.scss'

// types
import { FC, useState } from 'react'

export const FocusAreas: FC<{ content: any }> = ({ content }) => {
  const [focusAreas, setFocusAreas] = useState([])

  const { loading } = useQuery(FOCUS_AREAS, {
    context: { ms: microServices.backend },
    onCompleted: (data) => {
      setFocusAreas(data.getOrganizationFocusAreas)
    },
  })

  const myFocusAreas = focusAreas.map((item) => {
    const {
      coachingArea: { codename },
      base,
      value,
    } = item
    const areas = content.focusAreasName.find(
      (area: any) => area.codeName == codename
    )
    return { ...areas, base, value }
  })

  const chartData = {
    labels: myFocusAreas.map((area) => area.label),
    datasets: [
      {
        data: myFocusAreas.map((area) => area.value),
        backgroundColor: myFocusAreas.map((area) => area.color),
        radius: '100%',
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  }

  return (
    <section className={classes.section}>
      {!loading && (
        <>
          <h3 className={`mb-5 text-center ${classes.value}`}>
            {content.title}
          </h3>
          {/**
           * descomentar despues de solucionar datos de la grafica circular
           * <Container className={`mb-5 p-0 ${classes.chart}`}>
           *   <Col>
           *     <Row className={`justify-content-center align-items-center ${classes.chart_info}`}>
           *       <Col xs={5} className='text-center'>
           *         <h2>89/100</h2>
           *         <p>{content.description}</p>
           *       </Col>
           *     </Row>
           *   </Col>
           *   <ChartDoughnut data={chartData} />
           * </Container>
           */}
          <Row xs={1} lg={2} className='justify-content-around'>
            {myFocusAreas.map((item) => (
              <Row
                key={item.label}
                xs='auto'
                className='mb-5 justify-content-center align-items-end'>
                <i
                  className={`pi pi-${item.icon} ${classes.icon}`}
                  style={{ backgroundColor: item.color }}
                />
                <Col xs={8}>
                  <h5 className={`mb-3 ${classes.value}`}>{item.label}</h5>
                  <ProgressBar className={classes.progressBar}>
                    <ProgressBar
                      max={item.base}
                      now={item.value}
                      className={classes.bar}
                      style={{ backgroundColor: item.color }}
                    />
                  </ProgressBar>
                </Col>
                <h3 className={`fw-bold ${classes.value}`}>{item.value}</h3>
              </Row>
            ))}
          </Row>
        </>
      )}
    </section>
  )
}

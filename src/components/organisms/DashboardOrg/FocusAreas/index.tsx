// bootsrap components
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'

// prime components
import { PrimeIcons } from 'primereact/api'

// components
import { ChartDoughnut } from 'components/atoms/ChartDoughnut'

// styles
import clasess from 'styles/DashBoardOrg/focusAreas.module.scss'

// types
import { FC } from 'react'
import { ChartProps } from 'primereact/chart'

export const FocusAreas: FC<ChartProps> = ({ data }) => {
  return (
    <>
      <h1 className={`mb-5 text-center ${clasess.value}`}>Areas de enfoque</h1>
      <Container className={`pb-5 ${clasess.chart}`}>
        <Row
          className={`justify-content-center align-items-center ${clasess.chart_info}`}>
          <Col xs={4} className='text-center'>
            <h1>89/100</h1>
            <h5>Los coachees tienen areas de enfoque seleccionadas</h5>
          </Col>
        </Row>
        <ChartDoughnut data={data} />
      </Container>
      {[1, 2, 3].map((item) => (
        <Row
          key={item}
          xs='auto'
          className='mb-5 justify-content-center align-items-end'>
          <Col>
            <i
              className={`${PrimeIcons.HEART} ${clasess.icon}`}
              style={{ backgroundColor: '#fe5000' }}
            />
          </Col>
          <Col xs={8}>
            <h5 className={`mb-3 ${clasess.value}`}>Resilencia</h5>
            <ProgressBar className={clasess.progressBar}>
              <ProgressBar
                max={6}
                now={5.5}
                className={clasess.bar}
                style={{ backgroundColor: '#fe5000' }}
              />
            </ProgressBar>
          </Col>
          <Col>
            <h3 className={`fw-bold ${clasess.value}`}>5.5</h3>
          </Col>
        </Row>
      ))}
    </>
  )
}

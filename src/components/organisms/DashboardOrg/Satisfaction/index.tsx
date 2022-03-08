// bootsrap components
import { Col, ProgressBar, Row } from 'react-bootstrap'

// prime components
import { Knob } from 'primereact/knob'

// styles
import clasess from 'styles/DashBoardOrg/satisfaction.module.scss'

// types
import { FC } from 'react'

export const Satisfaction: FC = () => {
  return (
    <>
      <h1 className={`mb-5 text-center ${clasess.blue}`}>
        Satisfacción con el coaching
      </h1>
      <Knob
        max={10}
        value={5.9}
        readOnly
        textColor='#1a7bee'
        valueColor='#045095'
        valueTemplate={'{value}/10'}
        className={clasess.knob}
      />
      <Col xs={6} className='m-auto text-center'>
        <h5 className={`mb-5 fw-bold ${clasess.gray}`}>
          Metricas arrojadas a partir de 110 sesiones
        </h5>
      </Col>
      {[1, 2, 3].map((item) => (
        <Row
          key={item}
          xs='auto'
          className='mb-5 justify-content-center align-items-end'>
          <Col xs={8}>
            <h5 className={`mb-3 ${clasess.gray}`}>
              Mi entrenador y yo nos respetamos mutuamente
            </h5>
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
            <h3 className={`fw-bold ${clasess.blue}`}>5.5</h3>
          </Col>
        </Row>
      ))}
    </>
  )
}

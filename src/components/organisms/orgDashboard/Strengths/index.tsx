// boostrap components
import { Col, Container, Row } from 'react-bootstrap'

// prime components
import { PrimeIcons } from 'primereact/api'

// styles
import classes from 'styles/OrgDashboard/strengths.module.scss'

// types
import { FC } from 'react'

export const Strengths: FC = () => {
  return (
    <>
      <h1 className={`text-center mb-5 ${classes.value}`} >Áreas de enfoque</h1>
      <h3 className={`mb-3 ${classes.value}`} >Evaluación de fortalezas</h3>
      <p>
        Perfil de fortalezas de sus coachees basado en la evaluación realizada
        antes de comenzar el coaching
      </p>
      <Container className={`mt-5 ${classes.section}`} >
        <h5 className={`mb-4 fw-bold ${classes.value}`}>Fortalezas existentes</h5>
        <Row>
          {[1,2,3].map((item)=> (
            <Col key={item} className='text-center'>
              <i 
                className={`mb-3 ${classes.icon} ${PrimeIcons.STAR}`}
                style={{backgroundColor: '#1a7bee'}} />
              <p>Valores</p>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className={`mt-5 ${classes.section}`} >
        <h5 className={`mb-4 fw-bold ${classes.value}`}>Áreas de enfoque</h5>
        <Row>
          {[1,2,3].map((item)=> (
            <Col key={item} className='text-center'>
              <i 
                className={`mb-3 ${classes.icon} ${PrimeIcons.CLOCK}`}
                style={{backgroundColor: '#fe5000'}} />
              <p>Gestión del tiempo</p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

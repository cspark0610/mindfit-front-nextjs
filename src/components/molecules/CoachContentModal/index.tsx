// Main tools
import Image from 'next/image'

// Components

// Styles
import { Container, Row, Col, Button } from 'react-bootstrap'
import classes from 'styles/CoachContentModal/coachContentModel.module.scss'

// Types

export const CoachContentModal = () => {
  return (
    <Container fluid className={classes.container}>
      <Row className='text-center mb-4'>
        <div>
          <Image
            src='/static/images/avatar.png'
            alt='Mindfit Logo'
            width={150}
            height={150}
            layout='intrinsic'
            className={classes.images}
          />
        </div>
        <h2 className={`${classes.coach_data} fw-bold`}>Nombre de Coach</h2>
        <p className={`${classes.coach_data} fw-normal`}>Ocupacion del Coach</p>
      </Row>
      <Row className='mb-5'>
        <p className={`mb-4 ${classes.coach_description}`}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          tempore officiis modi obcaecati quas quae, natus numquam mollitia
          quaerat porro illum id quibusdam dolores esse quod delectus commodi
          vel asperiores? Reprehenderit distinctio praesentium alias? Ullam
          cumque optio quo possimus labore! Expedita hic error voluptas
          perspiciatis omnis quibusdam laborum provident. Omnis corrupti, rerum
          autem adipisci numquam soluta illum tempora voluptate! Explicabo.
        </p>
        <div className='text-end'>
          <Button className={classes.button}>Ver Mas..</Button>
        </div>
      </Row>
      <Row className='mb-5'>
        <p>Video</p>
      </Row>
    </Container>
  )
}

// main tools
import { useState } from 'react'
import { useRouter } from 'next/router'

// bootstrap components
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { Check2, Question } from 'react-bootstrap-icons'

// prime components
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// utils
import {
  validateUserSignup,
  workPositions,
} from 'components/organisms/ColaboratorSignup/utils'

// styles
import classes from 'styles/UI/Card/signupCard.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { DropdownChangeParams } from 'primereact/dropdown'

export const ColaboratorSignup: FC = () => {
  const { push } = useRouter()
  const [colaboratorData, setUserData] = useState({
    picture: {} as File,
    firstName: '',
    lastName: '',
    email: '',
    position: '',
  })

  const handleChange = (ev: ChangeType | DropdownChangeParams) =>
    setUserData({ ...colaboratorData, [ev.target.name]: ev.target.value })

  const handleSignup = () => push('/signup/colaborator/steps')

  const overlayTooltip = () => (
    <Tooltip>Por favor, complete todos los campos para continuar</Tooltip>
  )

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>Completa tu perfil</h1>
      <UploadPicture setData={setUserData} />
      <Container fluid>
        <Row className={classes.row}>
          <Col xs={12}>
            <InputText
              name='firstName'
              value={colaboratorData.firstName}
              onChange={handleChange}
              placeholder='Nombre'
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputText
              name='lastName'
              value={colaboratorData.lastName}
              onChange={handleChange}
              placeholder='Apellido'
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputText
              name='email'
              type='email'
              value={colaboratorData.email}
              onChange={handleChange}
              placeholder='Email'
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <Dropdown
              showClear
              name='position'
              options={workPositions}
              onChange={handleChange}
              placeholder='Posición o Cargo'
              className={classes.input}
              value={colaboratorData.position}
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          {validateUserSignup(colaboratorData) ? (
            <Col xs={12} sm={1} className={classes.mark}>
              <Check2 />
            </Col>
          ) : (
            <OverlayTrigger placement='bottom' overlay={overlayTooltip()}>
              <Col xs={12} sm={1} className={classes.mark}>
                <Question className={classes.tip} />
              </Col>
            </OverlayTrigger>
          )}
          <Col xs={12} sm={10}>
            <Button
              disabled={!validateUserSignup(colaboratorData)}
              onClick={handleSignup}
              className={classes.button}>
              Completa tu perfil
            </Button>
          </Col>
        </Row>
        <ExploreBadge />
      </Container>
    </section>
  )
}

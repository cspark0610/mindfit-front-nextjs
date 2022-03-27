// main tools
import { useRouter } from 'next/router'
import { useState } from 'react'

// gql
import CREATE_COACHEE from 'lib/mutations/Coachee/create.gql'
import UPDATE_USER from 'lib/mutations/User/update.gql'
import { useMutation } from '@apollo/client'

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
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// utils
import {
  validateUserSignup,
  workPositions,
} from 'components/organisms/ColaboratorSignup/utils'
import { microServices } from 'commons'

// styles
import classes from 'styles/UI/Card/signupCard.module.scss'

// types
import { DropdownChangeParams } from 'primereact/dropdown'
import { CoacheeDataType } from 'types/models/Coachee'
import { UserDataType } from 'types/models/User'
import { FC, ChangeEvent } from 'react'
import { Session } from 'next-auth'
import { ChangeType } from 'types'

export const ColaboratorSignup: FC<{ session: Session }> = ({ session }) => {
  const { push } = useRouter()
  const [uploadUrl, setUploadUrl] = useState('')
  const [colaboratorData, setUserData] = useState<
    UserDataType & CoacheeDataType
  >({
    bio: '',
    position: null,
    phoneNumber: '',
    aboutPosition: '',
    name: session.user.name,
    // profilePicture: {} as File,
  })

  const handleChange = (
    ev: ChangeType | DropdownChangeParams | ChangeEvent<HTMLTextAreaElement>
  ) => setUserData({ ...colaboratorData, [ev.target.name]: ev.target.value })

  const handleSignup = async () => {
    const { name, profilePicture, ...coacheeData } = colaboratorData
    if (colaboratorData.name !== session.user.name) {
      await UpdateUser({
        variables: { id: session?.user.sub, data: { name: name } },
      })
    }
    CreateCoachee({
      variables: {
        data: { ...coacheeData, profilePicture: 'Coachee_picture' },
      },
    })
  }

  const [CreateCoachee] = useMutation(CREATE_COACHEE, {
    context: { ms: microServices.backend },
    onCompleted: () => push('/signup/coachee/steps'),
    onError: (err) => console.log(err),
  })
  const [UpdateUser] = useMutation(UPDATE_USER, {
    context: { ms: microServices.backend },
    onError: (err) => console.log(err),
  })

  const overlayTooltip = () => (
    <Tooltip>Por favor, complete todos los campos para continuar</Tooltip>
  )

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>Completa tu perfil</h1>
      <UploadPicture setUploadUrl={setUploadUrl} setData={setUserData} />
      <Container fluid>
        <Row className={classes.row}>
          <Col xs={12} sm={6} md={4}>
            <InputText
              name='name'
              value={colaboratorData.name}
              onChange={handleChange}
              placeholder='Nombre y apellido'
              className={classes.input}
            />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <InputMask
              name='phoneNumber'
              onChange={handleChange}
              value={colaboratorData.phoneNumber}
              className={classes.input}
              mask='+99 (999) 999-9999'
              placeholder='Numero de celular'
            />
          </Col>
          <Col xs={12} md={4}>
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
          <Col xs={12} md={6}>
            <InputTextarea
              autoResize
              rows={8}
              name='aboutPosition'
              value={colaboratorData.aboutPosition}
              onChange={handleChange}
              className={classes.textarea}
              placeholder='Descripcion del cargo'
            />
          </Col>

          <Col xs={12} md={6}>
            <InputTextarea
              autoResize
              rows={8}
              name='bio'
              value={colaboratorData.bio}
              onChange={handleChange}
              className={classes.textarea}
              placeholder='Biografía'
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

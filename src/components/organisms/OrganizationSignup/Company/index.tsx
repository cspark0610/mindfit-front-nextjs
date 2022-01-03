// main tools
import { useRouter } from 'next/router'
import { useState } from 'react'

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
import { InputMask } from 'primereact/inputmask'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// utils
import { validateCompanySignup } from './utils'

// styles
import classes from 'styles/UI/Card/signupCard.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { InputMaskChangeParams } from 'primereact/inputmask'

export const CompanySignup: FC = () => {
  const { push } = useRouter()
  const [companyData, setCompanyData] = useState({
    picture: {} as File,
    name: '',
    phone: '',
    email: '',
  })

  const handleChange = (ev: ChangeType | InputMaskChangeParams) =>
    setCompanyData({ ...companyData, [ev.target.name]: ev.target.value })

  const handleSignupCompany = () => {
    push('/signup/organization')
  }

  const overlayTooltip = () => (
    <Tooltip>Por favor, complete todos los campos para continuar</Tooltip>
  )

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>Registra tu Empresa</h1>
      <UploadPicture setData={setCompanyData} />
      <Container fluid>
        <Row className={classes.row}>
          <Col xs={12}>
            <InputText
              name='name'
              value={companyData.name}
              onChange={handleChange}
              placeholder='Nombre de la Empresa'
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputMask
              mask='+99 (999) 999-9999'
              name='phone'
              value={companyData.phone}
              onChange={handleChange}
              placeholder='Teléfono de Contacto'
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputText
              name='email'
              type='email'
              value={companyData.email}
              onChange={handleChange}
              placeholder='Email Empresarial'
              className={classes.input}
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          {validateCompanySignup(companyData) ? (
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
              disabled={!validateCompanySignup(companyData)}
              onClick={handleSignupCompany}
              className={classes.button}>
              Registra tu empresa
            </Button>
          </Col>
        </Row>
        <ExploreBadge />
      </Container>
    </section>
  )
}

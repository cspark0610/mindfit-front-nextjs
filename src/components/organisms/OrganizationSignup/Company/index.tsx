// main tools
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
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
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'

// Commons
import { microServices } from 'commons'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// gql
import CREATE_COMPANY from 'lib/mutations/Signup/createCompany.gql'

// utils
import { validateCompanySignup } from './utils'

// styles
import classes from 'styles/UI/Card/signupCard.module.scss'

// types
import { FC, ChangeEvent } from 'react'
import { ChangeType } from 'types'
import { CompanyDataType } from 'types/models/Company'

export const CompanySignup: FC = () => {
  const { push } = useRouter()
  const { data } = useSession()
  const [companyData, setCompanyData] = useState<CompanyDataType>({
    profilePicture: {} as File,
    name: '',
    about: '',
  })

  const handleChange = (ev: ChangeType | ChangeEvent<HTMLTextAreaElement>) =>
    setCompanyData({ ...companyData, [ev.target.name]: ev.target.value })

  const handleSignupCompany = () => push('/signup/organization')

  const handleClick = () =>
    createCompany({
      variables: {
        company: {
          name: companyData.name,
          ownerId: data?.user.sub,
          about: companyData.about,
          profilePicture: 'imagen_de_la_empresa',
        },
      },
    })

  const [createCompany] = useMutation(CREATE_COMPANY, {
    context: { ms: microServices.backend },
    onCompleted: handleSignupCompany,
    onError: (error) => console.log(error),
  })

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
            <InputTextarea
              name='about'
              placeholder='Descripcion de la empresa'
              className={`h-50 ${classes.input} ${classes.textarea}`}
              rows={12}
              cols={27}
              value={companyData.about}
              onChange={handleChange}
              autoResize
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
              onClick={handleClick}
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

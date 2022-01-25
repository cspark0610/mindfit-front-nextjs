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

interface Props {
  content: any
  contentForm: any
}

export const CompanySignup: FC<Props> = ({ content, contentForm }) => {
  const { push } = useRouter()
  const { data } = useSession()
  const [companyData, setCompanyData] = useState<CompanyDataType>({
    profilePicture: {} as File,
    name: '',
    about: '',
  })

  const label = {
    name: contentForm.input1,
    description: contentForm.input2,
  }

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

  const overlayTooltip = () => <Tooltip>{content.tooltip}</Tooltip>

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>{contentForm.title}</h1>
      <UploadPicture setData={setCompanyData} />
      <Container fluid>
        <Row className={classes.row}>
          <Col xs={12}>
            <InputText
              name='name'
              value={companyData.name}
              onChange={handleChange}
              placeholder={label.name}
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputTextarea
              autoResize
              rows={5}
              name='about'
              onChange={handleChange}
              value={companyData.about}
              placeholder={label.description}
              className={`${classes.input} ${classes.textarea}`}
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
              {contentForm.button.label}
            </Button>
          </Col>
        </Row>
        <ExploreBadge />
      </Container>
    </section>
  )
}

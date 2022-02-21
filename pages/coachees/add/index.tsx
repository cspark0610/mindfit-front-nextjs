// main tools
import { useState } from 'react'
import { getSession } from 'next-auth/react'

// components
import { rowExpansionTemplate } from 'components/atoms/AddColaborators/RowExpansionTemplate'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { Toasts, INITIAL_TOAST_STATE } from 'components/atoms/Toasts'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

// Commons
import { microServices } from 'commons'

// utils
import {
  INITIAL_STATE,
  saveColaborator,
  verifyInviteColaboratorData,
} from 'utils/addColaborator'
import { workPositions } from 'components/organisms/ColaboratorSignup/utils'

// gql
import { useMutation } from '@apollo/client'
import { initializeApolloClient } from 'lib/apollo'
import COLLABORATOR_VIEW from 'lib/queries/Strapi/CollaboratorAdd/collaboratorAdd.gql'
import INVITE_COACHEE from 'lib/mutations/Coachee/inviteCoachee.gql'

// styles
import classes from 'styles/Colaborators/addPage.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { ChangeType, GetSSPropsType } from 'types'
import { InvitedColaboratorType } from 'types/models/Colaborator'
import { DropdownChangeParams } from 'primereact/dropdown'
import { Layout } from 'components/organisms/Layout'

interface InvitedColaborators extends InvitedColaboratorType {
  status: boolean
  labelPosition: string
  labelStatus: string
  stateSent: string
}

const AddCollaboratorPage: NextPage<
  GetSSPropsType<typeof getServerSideProps>
> = ({ content }) => {
  const [invitedColaborators, setInvitedColaborators] = useState<
    InvitedColaborators[]
  >([])
  const [expandedRows, setExpandedRows] = useState<InvitedColaboratorType[]>([])
  const [colaborator, setColaborator] = useState(INITIAL_STATE)
  const [error, setError] = useState('')
  const [addColaborator] = useMutation(INVITE_COACHEE)

  const [toast, setToast] = useState(INITIAL_TOAST_STATE)

  const handleChange = (ev: ChangeType | DropdownChangeParams) => {
    error && setError('')
    setColaborator({ ...colaborator, [ev.target.name]: ev.target.value })
  }

  const handleInvite = async () => {
    const { message, success } = verifyInviteColaboratorData(
      colaborator,
      content.fillFields,
      content.validEmail
    )
    if (success) {
      const { saved, message } = await saveColaborator(
        colaborator,
        addColaborator
      )
      setInvitedColaborators([
        ...invitedColaborators,
        {
          ...colaborator,
          status: saved,
          labelPosition: content.positionInput.placeholder,
          labelStatus: content.status.label,
          stateSent: content.status.value,
        },
      ])
      setColaborator(INITIAL_STATE)
      setToast({ show: true, message: message })
    } else setError(message as string)
  }

  return (
    <>
      <Layout>
        <Container className={classes.container}>
          <Container fluid className={classes.section}>
            <h1 className={classes.title}>{content.title}</h1>
            <p className={classes.description}>{content.subtitle}</p>
            <Row className={classes.row}>
              <Col md={4}>
                <InputText
                  name='name'
                  onChange={handleChange}
                  className={classes.input}
                  value={colaborator.name}
                  placeholder={content.nameInput.placeholder}
                />
              </Col>
              <Col md={4}>
                <Dropdown
                  name='position'
                  options={workPositions}
                  onChange={handleChange}
                  className={classes.input}
                  value={colaborator.position}
                  placeholder={content.positionInput.placeholder}
                />
              </Col>
            </Row>
            <Row className={classes.row}>
              <Col md={4}>
                <InputText
                  name='email'
                  type='email'
                  placeholder={content.emailInput.placeholder}
                  onChange={handleChange}
                  value={colaborator.email}
                  className={classes.input}
                />
              </Col>
              <Col md={8}>
                <Row className='flex-row-reverse'>
                  <Col md={6} lg={4}>
                    <Button onClick={handleInvite} className={classes.button}>
                      {content.submitButton.label}
                    </Button>
                    {error && <p className='p-error text-center'>{error}</p>}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={classes.row}>
              <DataTable
                breakpoint='960px'
                responsiveLayout='stack'
                value={invitedColaborators}
                expandedRows={expandedRows}
                tableClassName={classes.datatable}
                rowExpansionTemplate={rowExpansionTemplate}
                onRowToggle={(e) => setExpandedRows(e.data)}
                emptyMessage={content.emptyMessage}>
                <Column field='name' header={content.nameColumn} />
                <Column field='email' header={content.emailColumn} />
                <Column expander className={classes.expander_right} />
              </DataTable>
            </Row>
            <Row>
              <ExploreBadge />
            </Row>
          </Container>
        </Container>
      </Layout>
      <Toasts
        show={toast.show}
        title='collaborator add'
        message={toast.message}
        position='bottom-center'
        onClose={() => setToast(INITIAL_TOAST_STATE)}
      />
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session) return { redirect: { destination: '/', permanent: false } }
  else if (!session.user.organization)
    return {
      redirect: { destination: '/signup/organization', permanent: false },
    }

  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: COLLABORATOR_VIEW,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return { props: { content: data.collaboratorAdd.data.attributes } }
}

export default AddCollaboratorPage

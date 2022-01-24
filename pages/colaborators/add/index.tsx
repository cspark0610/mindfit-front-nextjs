// main tools
import { useState } from 'react'

// components
import { rowExpansionTemplate } from 'components/atoms/AddColaborators/RowExpansionTemplate'

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
  verifyInviteColaboratorData,
} from 'utils/addColaborator'

// gql
import { initializeApolloClient } from 'lib/apollo'
import COLLABORATOR_VIEW from 'lib/queries/CollaboratorAdd/collaboratorAdd.gql'

// styles
import classes from 'styles/Colaborators/addPage.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { ChangeType, GetSSPropsType } from 'types'
import { InvitedColaboratorType } from 'types/models/Colaborator'
import { DropdownChangeParams } from 'primereact/dropdown'

interface InvitedColaborators extends InvitedColaboratorType {
  status: boolean
  labelPosition: string
  labelDepartment: string
  labelStatus: string
  stateSent: string
}

const AddColaboratorPage: NextPage<
  GetSSPropsType<typeof getServerSideProps>
> = ({ content, contentForm }) => {
  const [invitedColaborators, setInvitedColaborators] = useState<
    InvitedColaborators[]
  >([])
  const [expandedRows, setExpandedRows] = useState<InvitedColaboratorType[]>([])
  const [colaborator, setColaborator] = useState(INITIAL_STATE)
  const [error, setError] = useState('')

  const labelFullName = contentForm.input1
  const labelPosition = contentForm.input2
  const labelDepartment = contentForm.input3
  const labelEmail = contentForm.input4

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
      setInvitedColaborators([
        ...invitedColaborators,
        {
          ...colaborator,
          status: true,
          labelDepartment: labelDepartment,
          labelPosition: labelPosition,
          labelStatus: content.status.label,
          stateSent: content.status.value,
        },
      ])
      setColaborator(INITIAL_STATE)
    } else setError(message as string)
  }

  return (
    <Container className={classes.container}>
      <Container fluid className={classes.section}>
        <h1 className={classes.title}>{contentForm.title}</h1>
        <p className={classes.description}>{contentForm.subtitle}</p>
        <Row className={classes.row}>
          <Col md={4}>
            <InputText
              name='fullName'
              onChange={handleChange}
              className={classes.input}
              value={colaborator.fullName}
              placeholder={labelFullName}
            />
          </Col>
          <Col md={4}>
            <Dropdown
              name='position'
              options={['Developer']}
              onChange={handleChange}
              className={classes.input}
              value={colaborator.position}
              placeholder={labelPosition}
            />
          </Col>
          <Col md={4}>
            <Dropdown
              name='department'
              onChange={handleChange}
              className={classes.input}
              options={['Development']}
              placeholder={labelDepartment}
              value={colaborator.department}
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col md={4}>
            <InputText
              name='email'
              type='email'
              placeholder={labelEmail}
              onChange={handleChange}
              value={colaborator.email}
              className={classes.input}
            />
          </Col>
          <Col md={8}>
            <Row className='flex-row-reverse'>
              <Col md={6} lg={4}>
                <Button onClick={handleInvite} className={classes.button}>
                  {contentForm.button.label}
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
            <Column field='fullName' header={content.column1} />
            <Column field='email' header={content.column2} />
            <Column expander className={classes.expander_right} />
          </DataTable>
        </Row>
      </Container>
    </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: COLLABORATOR_VIEW,
    context: { ms: microServices.strapi },
  })
  const view = data.collaboratorAdd.data.attributes
  const form = data.collaboratorAdd.data.attributes.registration.data.attributes
  return {
    props: {
      content: view,
      contentForm: form,
    },
  }
}

export default AddColaboratorPage

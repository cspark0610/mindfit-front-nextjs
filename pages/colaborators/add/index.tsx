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

// utils
import {
  INITIAL_STATE,
  verifyInviteColaboratorData,
} from 'utils/addColaborator'

// styles
import classes from 'styles/Colaborators/addPage.module.scss'

// types
import { NextPage } from 'next'
import { ChangeType } from 'types'
import { InvitedColaboratorType } from 'types/models/Colaborator'
import { DropdownChangeParams } from 'primereact/dropdown'

interface InvitedColaborators extends InvitedColaboratorType {
  status: boolean
}

const AddColaboratorPage: NextPage = () => {
  const [invitedColaborators, setInvitedColaborators] = useState<
    InvitedColaborators[]
  >([])
  const [expandedRows, setExpandedRows] = useState<InvitedColaboratorType[]>([])
  const [colaborator, setColaborator] = useState(INITIAL_STATE)
  const [error, setError] = useState('')

  const handleChange = (ev: ChangeType | DropdownChangeParams) => {
    error && setError('')
    setColaborator({ ...colaborator, [ev.target.name]: ev.target.value })
  }

  const handleInvite = () => {
    const { message, success } = verifyInviteColaboratorData(colaborator)
    if (success) {
      setInvitedColaborators([
        ...invitedColaborators,
        { ...colaborator, status: true },
      ])
      setColaborator(INITIAL_STATE)
    } else setError(message as string)
  }

  return (
    <Container className={classes.container}>
      <Container fluid className={classes.section}>
        <h1 className={classes.title}>Invita a tus colaboradores</h1>
        <p className={classes.description}>
          Invita miembros para que colaboren con el equipo
        </p>
        <Row className={classes.row}>
          <Col md={4}>
            <InputText
              name='fullName'
              onChange={handleChange}
              className={classes.input}
              value={colaborator.fullName}
              placeholder='Nombre y apellido'
            />
          </Col>
          <Col md={4}>
            <Dropdown
              name='position'
              options={['Developer']}
              onChange={handleChange}
              className={classes.input}
              value={colaborator.position}
              placeholder='Posicion o cargo'
            />
          </Col>
          <Col md={4}>
            <Dropdown
              name='department'
              onChange={handleChange}
              className={classes.input}
              options={['Development']}
              placeholder='Departamento'
              value={colaborator.department}
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col md={4}>
            <InputText
              name='email'
              type='email'
              placeholder='Email'
              onChange={handleChange}
              value={colaborator.email}
              className={classes.input}
            />
          </Col>
          <Col md={8}>
            <Row className='flex-row-reverse'>
              <Col md={6} lg={4}>
                <Button onClick={handleInvite} className={classes.button}>
                  Invitar
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
            emptyMessage='No se han enviado invitaciones'>
            <Column field='fullName' header='Nombre' />
            <Column field='email' header='Email' />
            <Column expander className={classes.expander_right} />
          </DataTable>
        </Row>
      </Container>
    </Container>
  )
}

export default AddColaboratorPage

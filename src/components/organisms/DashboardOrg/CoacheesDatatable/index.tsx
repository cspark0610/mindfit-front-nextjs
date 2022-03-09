// main tools
import { useState } from 'react'
import { Session } from 'next-auth'

// components
import { DataTable } from 'components/molecules/Datatable'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'

// prime component
import { confirmDialog } from 'primereact/confirmdialog'

// Commons
import { microServices } from 'commons'

// gql
import { useMutation, useQuery } from '@apollo/client'
import ORG_COACHEE from 'lib/queries/Organization/findOrganizationById.gql'
import DELETE_MANY_COACHEE from 'lib/mutations/Coachee/deleteManyCoachees.gql'

// utils
import { schema } from 'utils/actionDataTable'

// styles
import classes from 'styles/DashboardOrg/coacheesDatatable.module.scss'

// types
import { FC } from 'react'
import { CoacheeDataType } from 'types/models/Coachee'

const CoacheesDatatable: FC<{ session: Session; content: any }> = ({
  session,
  content,
}) => {
  const [coachees, setCoachees] = useState([])
  const [selected, setSelected] = useState<CoacheeDataType[]>([])
  const id = session.user.organization?.id

  const { loading, refetch } = useQuery(ORG_COACHEE, {
    context: { ms: microServices.backend },
    variables: { id },
    onCompleted: (data) => setCoachees(data.findOrganizationById.coachees),
  })

  const [deleteManyCoachee] = useMutation(DELETE_MANY_COACHEE, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch,
  })

  const coachBody = ({ user }: CoacheeDataType) => {
    const userCoach = user?.coach?.user
    if (userCoach)
      return (
        <div>
          <img
            alt={userCoach?.name}
            src={userCoach?.profilePicture as string}
            width={32}
            style={{ verticalAlign: 'middle' }}
          />
          <span className='image-text'>{userCoach?.name}</span>
        </div>
      )
    else return <p>sin coach asignado</p>
  }

  const statusBody = ({ registrationStatus }: CoacheeDataType) => {
    const statusCodeNames = content.datatable.data.attributes.statusCodeNames
    const status = statusCodeNames.find(
      (statu: any) => statu.registrationStatus == registrationStatus
    )
    return (
      <div
        className={`${classes[`button_${registrationStatus}`]} ${
          classes.button
        }`}>
        {status.label}
      </div>
    )
  }

  const accept = () => {
    const ids = selected.map((coachee) => coachee.id)
    deleteManyCoachee({ variables: { ids } })
  }

  const remove = () => {
    confirmDialog({
      message: 'esta seguro con la eliminación?',
      header: 'Confirmation eliminación',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept,
    })
  }

  const edit = (id: number | string) => {
    console.log(id, 'editar')
  }

  return (
    <Container>
      <h3 className={`mb-5 ${classes.title}`}>{content.coacheesTitle}</h3>
      <Container className={classes.section}>
        <Row xs='auto' className='mb-4 justify-content-end'>
          <Col>
            <Button disabled={!selected.length} className={classes.button}>
              {content.disableButton.label}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={!selected.length}
              className={classes.button}
              onClick={() => remove()}
              variant='danger'>
              <Trash size={28} />
            </Button>
          </Col>
        </Row>
        {!loading && (
          <DataTable
            selection={selected}
            onSelectionChange={(e) => setSelected(e.value)}
            value={coachees}
            schema={schema(
              content.datatable.data.attributes,
              statusBody,
              coachBody
            )}
            actions={{ edit: edit }}
          />
        )}
      </Container>
    </Container>
  )
}

export default CoacheesDatatable

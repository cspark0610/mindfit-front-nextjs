// main tools
import Image from 'next/image'
import { useState } from 'react'
import { Session } from 'next-auth'

// components
import { DataTable } from 'components/molecules/Datatable'
import { CoacheeManagement } from 'components/molecules/CoacheeManagement'
import { InviteCoachee } from 'components/molecules/InviteCoachee'

// bootstrap components
import { Button, Col, Row } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'

// prime components
import { confirmDialog } from 'primereact/confirmdialog'

// Commons
import { microServices } from 'commons'

// gql
import { useMutation, useQuery } from '@apollo/client'
import ORG_COACHEE from 'lib/queries/Organization/findOrganizationById.gql'
import DELETE_MANY_COACHEE from 'lib/mutations/Coachee/deleteManyCoachees.gql'
import UPDATE_MANY_COACHEES from 'lib/mutations/Coachees/updateCoachees.gql'

// utils
import { schema } from 'utils/actionDataTable'

// styles
import classes from 'styles/DashboardOrg/coacheesDatatable.module.scss'

// types
import { FC } from 'react'
import { CoacheeDataType } from 'types/models/Coachee'

export const CoacheesDatatable: FC<{ session: Session; content: any }> = ({
  session,
  content,
}) => {
  const [coachees, setCoachees] = useState([])
  const [coachee, setCoachee] = useState()
  const [selected, setSelected] = useState<CoacheeDataType[]>([])
  const [showEdit, setShowEdit] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
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
  const [suspendCoachee] = useMutation(UPDATE_MANY_COACHEES, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch,
  })

  const coachBody = ({ user }: CoacheeDataType) => {
    const userCoach = user?.coach?.user
    if (userCoach)
      return (
        <div>
          <Image
            width={32}
            height={32}
            alt={userCoach?.name}
            src={userCoach?.profilePicture as string}
          />
          <span className='image-text'>{userCoach?.name}</span>
        </div>
      )
    else return <p>sin coach asignado</p>
  }

  const statusBody = ({ registrationStatus }: CoacheeDataType) => {
    const statusCodeNames = content.datatable.statusCodeNames
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

  const remove = () => {
    const ids = selected.map((coachee) => coachee.id)
    deleteManyCoachee({ variables: { ids } })
  }
  const suspend = () => {
    const ids = selected.map((coachee) => coachee.id)
    suspendCoachee({ variables: { coacheeId: ids, data: { isSuspend: true } } })
  }

  const confirmRemove = () => {
    confirmDialog({
      message: 'esta seguro con la eliminación?',
      header: 'Confirmation eliminación',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: remove,
    })
  }

  const confirmSuspend = () => {
    confirmDialog({
      message: 'esta seguro con la suspencion?',
      header: 'Confirmation suspencion',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: suspend,
    })
  }

  const edit = (id: number) => {
    const newCoachee = coachees.find(({ id: coacheeId }) => coacheeId == id)
    setCoachee(newCoachee)
    setShowEdit(true)
  }

  return (
    <>
      <section className={classes.section}>
        <Row xs='auto' className='mb-4 justify-content-end'>
          <Col>
            <Button
              disabled={!selected.length}
              className={classes.button}
              onClick={() => confirmSuspend()}>
              {content.disableButton.label}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={!selected.length}
              className={classes.button}
              onClick={() => confirmRemove()}
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
            schema={schema(content.datatable, statusBody, coachBody)}
            actions={{ edit: edit }}
          />
        )}
        <Row xs='auto' className='mt-4 justify-content-end'>
          <Col>
            <Button
              className={classes.button}
              onClick={() => setShowInvite(true)}>
              Añadir Coachee
            </Button>
          </Col>
        </Row>
      </section>
      {showEdit && (
        <CoacheeManagement
          show={showEdit}
          onHide={() => setShowEdit(false)}
          data={coachee || {}}
          refetch={refetch}
        />
      )}
      <InviteCoachee
        show={showInvite}
        onHide={() => setShowInvite(false)}
        refetch={refetch}
      />
    </>
  )
}

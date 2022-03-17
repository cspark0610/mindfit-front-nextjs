// main tools
import { useState } from 'react'

// components
import { DataTable } from 'components/molecules/Datatable'
import { CoacheeManagement } from 'components/molecules/CoacheeManagement'
import { InviteCoachee } from 'components/molecules/InviteCoachee'
import { DatatableSkeleton } from 'components/molecules/Datatable/Skeleton'

// bootstrap components
import { Button, Col, Row } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'

// prime components
import { confirmDialog } from 'primereact/confirmdialog'

// Commons
import { microServices } from 'commons'

// gql
import { useMutation, useQuery } from '@apollo/client'
import ORG_COACHEE from 'lib/queries/Organization/getById.gql'
import DELETE_MANY_COACHEE from 'lib/mutations/Coachee/deleteManyCoachees.gql'

// utils
import { schema } from 'utils/actionDataTable'
import { coachBodyTemplate, statusBodyTemplate } from './templates'

// styles
import classes from 'styles/DashboardOrg/coacheesDatatable.module.scss'

// types
import { FC } from 'react'
import { CoacheeDataType } from 'types/models/Coachee'

export const CoacheesDatatable: FC<{ user: CoacheeDataType; content: any }> = ({
  user,
  content,
}) => {
  const [coachees, setCoachees] = useState([])
  const [coachee, setCoachee] = useState()
  const [selected, setSelected] = useState<CoacheeDataType[]>([])
  const [showEdit, setShowEdit] = useState(false)
  const [showInvite, setShowInvite] = useState(false)

  const { loading, refetch } = useQuery(ORG_COACHEE, {
    context: { ms: microServices.backend },
    variables: { id: user.organization?.id },
    onCompleted: (data) => {
      setCoachees(
        data.findOrganizationById.coachees.filter(
          (coachee: CoacheeDataType) => coachee.id !== user.id
        )
      )
    },
  })

  const [deleteManyCoachee] = useMutation(DELETE_MANY_COACHEE, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch,
  })

  const confirmRemove = () => {
    confirmDialog({
      message: 'esta seguro con la eliminación?',
      header: 'Confirmation eliminación',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () =>
        deleteManyCoachee({
          variables: { ids: selected.map((coachee) => coachee.id) },
        }),
    })
  }

  const edit = (id: number) => {
    setCoachee(coachees.find(({ id: coacheeId }) => coacheeId == id))
    setShowEdit(true)
  }

  return (
    <>
      <section className={classes.section}>
        {user?.isAdmin && (
          <Row xs='auto' className='mb-4 justify-content-end'>
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
        )}
        {!loading ? (
          <DataTable
            selection={selected}
            onSelectionChange={(e) => setSelected(e.value)}
            value={coachees}
            schema={schema(
              content.datatable,
              (ev) => statusBodyTemplate(ev, content.datatable.statusCodeNames),
              (ev) => coachBodyTemplate(ev.assignedCoach)
            )}
            actions={user?.isAdmin ? { edit: edit } : undefined}
          />
        ) : (
          <DatatableSkeleton />
        )}
        {user?.isAdmin && (
          <Row xs='auto' className='mt-4 justify-content-end'>
            <Col>
              <Button
                className={classes.button}
                onClick={() => setShowInvite(true)}>
                Añadir Coachee
              </Button>
            </Col>
          </Row>
        )}
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

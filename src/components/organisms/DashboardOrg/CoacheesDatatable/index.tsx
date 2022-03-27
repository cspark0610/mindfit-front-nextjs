// main tools
import { useState } from 'react'

// components
import { DatatableSkeleton } from 'components/molecules/Datatable/Skeleton'
import { CoacheeManagement } from 'components/molecules/CoacheeManagement'
import { InviteCoachee } from 'components/molecules/InviteCoachee'
import { DataTable } from 'components/molecules/Datatable'

// bootstrap components
import { Button, Col, Row } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'

// prime components
import { confirmDialog } from 'primereact/confirmdialog'

// Commons
import { microServices } from 'commons'

// gql
import DELETE_MANY_COACHEE from 'lib/mutations/Coachee/deleteManyCoachees.gql'
import GET_ORG_BY_ID from 'lib/queries/Organization/getById.gql'
import { useMutation, useQuery } from '@apollo/client'

// utils
import {
  coachBodyTemplate,
  statusBodyTemplate,
} from 'components/organisms/DashboardOrg/CoacheesDatatable/templates'
import { schema } from 'utils/actionDataTable'

// styles
import classes from 'styles/DashboardOrg/coacheesDatatable.module.scss'

// types
import { CoacheeDataType } from 'types/models/Coachee'
import { FC } from 'react'

export const CoacheesDatatable: FC<{
  coachee: CoacheeDataType
  content: any
}> = ({ coachee, content }) => {
  const [coachees, setCoachees] = useState([])
  const [coacheeToEdit, setCoacheeToEdit] = useState()
  const [selected, setSelected] = useState<CoacheeDataType[]>([])
  const [showEdit, setShowEdit] = useState(false)
  const [showInvite, setShowInvite] = useState(false)

  const { loading, refetch } = useQuery(GET_ORG_BY_ID, {
    context: { ms: microServices.backend },
    variables: { id: coachee.organization?.id },
    onCompleted: (data) => {
      setCoachees(
        data.findOrganizationById.coachees.filter(
          (coachee: CoacheeDataType) => coachee.id !== coachee.id
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
      message: content.confirmDeletion.message,
      header: content.confirmDeletion.title,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      acceptLabel: content.confirmDeletion.confirmButton.label,
      rejectLabel: content.confirmDeletion.denyButton.label,
      accept: () =>
        deleteManyCoachee({
          variables: { ids: selected.map((coachee) => coachee.id) },
        }),
    })
  }

  const edit = (id: number) => {
    setCoacheeToEdit(coachees.find(({ id: coacheeId }) => coacheeId == id))
    setShowEdit(true)
  }

  return (
    <>
      <section className={classes.section}>
        {coachee.isAdmin && (
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
            actions={coachee?.isAdmin ? { edit } : undefined}
          />
        ) : (
          <DatatableSkeleton />
        )}
        {coachee.isAdmin && (
          <Row xs='auto' className='mt-4 justify-content-end'>
            <Col>
              <Button
                className={classes.button}
                onClick={() => setShowInvite(true)}>
                {content.inviteButton.label}
              </Button>
            </Col>
          </Row>
        )}
      </section>
      {showEdit && (
        <CoacheeManagement
          content={content}
          coacheeForm={content.coacheeForm}
          show={showEdit}
          onHide={() => setShowEdit(false)}
          data={coacheeToEdit || {}}
          refetch={refetch}
        />
      )}
      <InviteCoachee
        content={content}
        coacheeForm={content.coacheeForm}
        show={showInvite}
        onHide={() => setShowInvite(false)}
        refetch={refetch}
      />
    </>
  )
}

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
import { PrimeIcons } from 'primereact/api'

// Commons
import { microServices } from 'commons'

// gql
import GET_COACHEES from 'lib/queries/Organization/OrgDashboard/getCoachees.gql'
import DELETE_MANY_COACHEE from 'lib/mutations/Coachee/deleteManyCoachees.gql'
import { useMutation, useQuery } from '@apollo/client'

// utils
import {
  coachBodyTemplate,
  createdAtTemplate,
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
  const [showEdit, setShowEdit] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [coacheeToEdit, setCoacheeToEdit] = useState()
  const [selected, setSelected] = useState<CoacheeDataType[]>([])

  const { loading, refetch } = useQuery(GET_COACHEES, {
    context: { ms: microServices.backend },
    onCompleted: (data) =>
      setCoachees(
        data.getOrganizationProfile.coachees.filter(
          (orgCoachee: CoacheeDataType) => orgCoachee.id !== coachee.id
        )
      ),
  })

  const [deleteManyCoachee] = useMutation(DELETE_MANY_COACHEE, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch,
  })

  const confirmRemove = () => {
    confirmDialog({
      icon: PrimeIcons.CIRCLE,
      acceptClassName: 'p-button-danger',
      header: content.confirmDeletion.title,
      message: content.confirmDeletion.message,
      rejectLabel: content.confirmDeletion.denyButton.label,
      acceptLabel: content.confirmDeletion.confirmButton.label,
      accept: () =>
        deleteManyCoachee({
          variables: { ids: selected.map((coachee) => coachee.id) },
        }),
    })
  }

  const edit = (id: number) => {
    setCoacheeToEdit(coachees.find(({ id: coacheeId }) => coacheeId === id))
    setShowEdit(true)
  }

  return (
    <>
      <section className={classes.section}>
        {coachee.isAdmin && (
          <Row xs='auto' className='mb-4 justify-content-end'>
            <Col>
              <Button
                variant='danger'
                className={classes.button}
                disabled={!selected.length}
                onClick={() => confirmRemove()}>
                <Trash size={28} />
              </Button>
            </Col>
          </Row>
        )}
        {!loading ? (
          <DataTable
            value={coachees}
            selection={selected}
            onSelectionChange={(e) => setSelected(e.value)}
            actions={coachee?.isAdmin ? { edit } : undefined}
            schema={schema(
              content.datatable,
              (ev) => statusBodyTemplate(ev, content.datatable.statusCodeNames),
              (ev) => coachBodyTemplate(ev.assignedCoach),
              (ev) => createdAtTemplate(ev as CoacheeDataType)
            )}
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
          show={showEdit}
          refetch={refetch}
          content={content}
          data={coacheeToEdit || {}}
          coacheeForm={content.coacheeForm}
          onHide={() => setShowEdit(false)}
        />
      )}
      <InviteCoachee
        content={content}
        show={showInvite}
        refetch={refetch}
        coacheeForm={content.coacheeForm}
        onHide={() => setShowInvite(false)}
      />
    </>
  )
}

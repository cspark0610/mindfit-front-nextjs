// bootstrap components
import { PauseBtn, Pencil, Trash } from 'react-bootstrap-icons'

// styles
import classes from 'styles/OrganizationDashboard/datatable.module.scss'

// types
import { FC } from 'react'
import { TableActionColumnProps } from 'types/components/datatable'

interface Props extends TableActionColumnProps {
  id: string | number
}

export const ActionDataTable: FC<Props> = ({ pause, remove, edit, id }) => {
  return (
    <>
      {pause && (
        <PauseBtn
          className={`p-2 ${classes.pause}`}
          size={48}
          onClick={() => pause(id)}
        />
      )}
      {remove && (
        <Trash
          className={`p-2 ${classes.remove}`}
          size={48}
          onClick={() => remove(id)}
        />
      )}
      {edit && (
        <Pencil
          className={`p-2 ${classes.edit}`}
          size={48}
          onClick={() => edit(id)}
        />
      )}
    </>
  )
}

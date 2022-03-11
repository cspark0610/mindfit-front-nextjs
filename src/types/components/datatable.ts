// types
import { DataTableProps } from 'primereact/datatable'

export interface StyledDataTableProps extends DataTableProps {
  schema: object[]
  actions: TableActionColumnProps | undefined
}

export type TableActionColumnProps = {
  remove?: (id: number) => void
  pause?: (id: number) => void
  edit?: (id: number) => void
}

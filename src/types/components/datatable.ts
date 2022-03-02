// types
import { DataTableProps } from 'primereact/datatable';

export interface StyledDataTableProps extends DataTableProps {
  schema: object[]
  items: object[]
  actions: TableActionColumnProps | undefined
}

export type TableActionColumnProps = {
  remove?: (id: string | number) => void
  pause?: (id: string | number) => void
  edit?: (id: string | number) => void
}

// components
import { ActionDataTable } from 'components/molecules/ActionDataTable'

// prime components
import { Column, ColumnProps } from 'primereact/column'
import { DataTable as PrimeDatatable } from 'primereact/datatable'

// types
import { FC } from 'react'
import { StyledDataTableProps } from 'types/components/datatable'

// styles
import classes from 'styles/DashboardOrg/coacheesDatatable.module.scss'

export const DataTable: FC<StyledDataTableProps> = ({
  schema,
  value,
  selection,
  onSelectionChange,
  actions = undefined,
}) => {
  const dynamicColumns = schema.map((col: ColumnProps) => (
    <Column
      key={col.field}
      field={col.field}
      header={col.header}
      align='center'
      body={col.body}
    />
  ))

  return (
    <PrimeDatatable
      rows={10}
      paginator
      value={value}
      breakpoint='1200px'
      selection={selection}
      responsiveLayout='stack'
      onSelectionChange={onSelectionChange}
      className={classes.datatable}
      tableClassName={classes.datatable_table}
      emptyMessage='No se han encontrado resultados'>
      <Column selectionMode='multiple' headerStyle={{ width: '3em' }} />
      {dynamicColumns}
      {actions !== undefined && (
        <Column
          align='center'
          header='Acciones'
          body={(item) => <ActionDataTable {...actions} {...item} />}
        />
      )}
    </PrimeDatatable>
  )
}
